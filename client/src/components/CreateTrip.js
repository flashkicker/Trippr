import React, { Component } from "react"
import { connect } from "react-redux"

import TripForm from "./TripForm"
import { createTrip } from "../actions"

class CreateTrip extends Component {
	onSubmit = formValues => {
        this.props.createTrip(formValues)
	}	
	
	render() {
		return (
			<div>
				<h1 className="header item">Create a road trip</h1>
				<TripForm onSubmit={this.onSubmit} />
			</div>
		)
	}
}

export default connect(
	null,
	{
		createTrip
	}
)(CreateTrip)
