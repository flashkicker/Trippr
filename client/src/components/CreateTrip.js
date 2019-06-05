import React, { Component } from "react"
import { connect } from "react-redux"

import TripForm from "./TripForm"
import { createTrip } from "../actions"

class CreateTrip extends Component {
	onSubmit = formValues => {
		const stops = []
		
		for (let i = 1; i <= this.props.numberOfStops; i++) {
			stops.push(formValues[`stop${i}`])
		}

		this.props.createTrip({
			...formValues,
			stops
		})
	}

	render() {
		return (
			<div className="ui segment" style={{ marginBottom: 80 }}>
				<h1 className="header item">Create a road trip</h1>
				<TripForm onSubmit={this.onSubmit} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		numberOfStops: state.numberOfStops
	}
}

export default connect(
	mapStateToProps,
	{
		createTrip
	}
)(CreateTrip)
