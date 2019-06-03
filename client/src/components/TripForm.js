import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"

import { getPlacesSuggestions, getNumberOfStops } from "../actions"

class TripForm extends Component {
	state = {
		stopsList: []
	}

	onSubmit = formValues => {
		this.props.onSubmit(formValues)
	}

	renderError = errorProps => {
		const { error, touched } = errorProps
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	renderStopInput = formProps => {
		const { input, label, meta } = formProps

		const className = `field ${meta.error && meta.touched ? "error" : ""}`

		return (
			<div className={className}>
				<label>{label}</label>
				<input
					{...input}
					className={className}
					type="text"
					list="data"
					onChange={event => {
						input.onChange(event)
						let query = event.target.value
						if (query.length > 2) {
							this.props.getPlacesSuggestions(query)
						}
					}}
					onBlur={() => {
						if(input.value) {
							input.onBlur(this.props.predictions[0].description)
						}
					}}
				/>
				<datalist id="data">
					{this.props.predictions.map((item, index) => {
						return <option value={item.description} key={index} />
					})}
				</datalist>
				{this.renderError(meta)}
			</div>
		)
	}

	renderInput = formProps => {
		const { input, label, meta } = formProps
		const className = `field ${meta.error && meta.touched ? "error" : ""}`
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		)
	}

	renderInputField = () => {
		const { stopsList } = this.state

		this.setState({
			stopsList: [
				...stopsList,
				<div>
					<Field
						label={`Stop ${stopsList.length + 1}`}
						name={`stop${stopsList.length + 1}`}
						component={this.renderStopInput}
						key={stopsList.length + 1}
					/>
					<button
						className="circular ui button info"
						type="button"
						onClick={this.renderCommentBox}
					>
						Add a comment about this stop
					</button>
				</div>
			]
		})
	}

	removeInputField = () => {
		const { stopsList } = this.state
		stopsList.pop()
		this.setState({ stopsList })
	}

	renderRemoveButton = () => {
		if (this.state.stopsList.length) {
			return (
				<button
					className="circular ui icon button negative"
					type="button"
					onClick={this.removeInputField}
				>
					<i className="icon remove" />
					Remove Stop
				</button>
			)
		}
	}

	renderAddButton = () => {
		return (
			<button
				className="circular ui icon button"
				type="button"
				onClick={this.renderInputField}
			>
				<i className="icon add" />
				Add Stop
			</button>
		)
	}

	renderStopsList = () => {
		const { stopsList } = this.state
		if (stopsList) {
			this.props.getNumberOfStops(stopsList.length)
			return <div>{this.state.stopsList.map(field => field)}</div>
		}
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field label="Title" name="title" component={this.renderInput} />
					{/* <Field
						label="Description"
						name="description"
						component={this.renderInput}
					/> */}
					<Field
						label="Origin"
						name="origin"
						component={this.renderStopInput}
					/>
					{this.renderStopsList()}
					<Field
						label="Destination"
						name="destination"
						component={this.renderStopInput}
					/>
					<div className="ui container">
						{this.renderAddButton()}
						{this.renderRemoveButton()}
					</div>
					<button style={{ marginTop: 40 }} className="ui button primary">
						Save
					</button>
				</form>
			</div>
		)
	}
}

const validate = formValues => {
	const errors = {}

	if (!formValues.title) {
		errors.title = "You must enter a title"
	}

	// if (!formValues.origin) {
	// 	errors.origin = "You must enter an origin"
	// }

	// if (!formValues.destination) {
	// 	errors.destination = "You must enter a destination"
	// }

	return errors
}

const mapStateToProps = state => {
	const predictions = []
	state.predictions.map((prediction) => {
		const { description, place_id } = prediction
		predictions.push({
			description,
			place_id
		})
	})

	return { 
		predictions
	}
}

const formWrapped = reduxForm({
	form: "tripForm",
	validate
})(TripForm)

export default connect(
	mapStateToProps,
	{
		getPlacesSuggestions,
		getNumberOfStops
	}
)(formWrapped)
