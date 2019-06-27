import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchTrip, editTrip } from "../actions"
import TripForm from "./TripForm"

class EditTrip extends Component {
	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.id)
	}

	onSubmit = formValues => {
		const stops = []

		for (let i = 1; i <= this.props.numberOfStops; i++) {
			stops.push(formValues[`stop${i}`])
		}

		console.log(stops)

		this.props.editTrip(this.props.match.params.id, {
			...formValues,
			stops
		})
	}

	parseInitialValues = () => {
		const { title, stops, numberOfStops } = this.props.trip

		let initialValues = {
			title,
			numberOfStops,
			origin: stops[0].place,
			destination: stops[stops.length - 1].place,
			stops: []
		}

		if (stops.length > 2) {
			for (let i = 1; i < stops.length - 1; i++) {
				initialValues.stops.push(stops[i].place)
				initialValues[`stop${i}`] = stops[i].place
			}
		}

		return initialValues
	}

	render() {
		if (!this.props.trip) {
			return <div>Loading...</div>
		}

		return (
			<div className="ui segment" style={{ marginBottom: 80 }}>
				<h1 className="header item" style={{ marginBottom: 40 }}>
					{`Editing Trip: ${this.props.trip.title}`}
				</h1>
				<TripForm
					initialValues={this.parseInitialValues()}
					onSubmit={this.onSubmit}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		trip: state.trips[ownProps.match.params.id],
		numberOfStops: state.numberOfStops
	}
}

export default connect(
	mapStateToProps,
	{
		fetchTrip,
		editTrip
	}
)(EditTrip)
