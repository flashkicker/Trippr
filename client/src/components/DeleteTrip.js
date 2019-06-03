import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import history from "../history"
import Modal from "./Modal"
import { fetchTrip, deleteTrip } from "../actions"

class DeleteTrip extends Component {
	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.id)
	}

	renderModalButtons = () => {
		const { id } = this.props.match.params

		return (
			<Fragment>
				<button
					onClick={() => {
						this.props.deleteTrip(id)
					}}
					className="ui button negative"
				>
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</Fragment>
		)
	}

	renderTripDetails = () => {
		if (!this.props.trip) {
			return "Are you sure you want to delete this trip?"
		}

		return `Are you sure you want to delete the trip: ${this.props.trip.title}?`
	}

	render() {
		return (
			<div>
				<Modal
					title="Delete Trip"
					content={this.renderTripDetails()}
					actions={this.renderModalButtons()}
					onDismiss={() => {
						history.push("/")
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		trip: state.trips[ownProps.match.params.id]
	}
}

export default connect(
	mapStateToProps,
	{
		fetchTrip,
		deleteTrip
	}
)(DeleteTrip)
