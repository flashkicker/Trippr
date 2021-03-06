import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Rating } from "semantic-ui-react"
import { connect } from "react-redux"
import _ from "lodash"
import { withStyles } from "@material-ui/styles"

import { saveTrip, unsaveTrip, fetchSavedTrips, fetchTrips } from "../actions"

const styles = {
	hover: {
		padding: "10px",
		"&:hover": {
			backgroundColor: "#edf6ff",
			padding: "10px",
			borderRadius: "5px"
		}
	}
}

class TripCard extends Component {
	componentDidMount() {
		this.props.fetchSavedTrips()
	}

	isLoggedIn = tripId => {
		if (this.props.currentUserId) {
			return this.isTripSaved(tripId)
		} else {
			return <Rating className="heart outline like icon" rating={1} />
		}
	}

	isTripSaved = tripId => {
		const { savedTrips } = this.props

		if (this.props.currentUserId)
			if (savedTrips.indexOf(tripId) > -1) {
				return (
					<Rating
						className="heart outline like icon"
						rating={1}
						onRate={this.handleSaveClick}
					/>
				)
			} else {
				return (
					<Rating
						className="heart outline like icon"
						rating={0}
						onRate={this.handleSaveClick}
						size="huge"
					/>
				)
			}
	}

	renderEditAndDeleteButtons = trip => {
		if (
			this.props.renderEditAndDeleteButtons &&
			trip._user === this.props.currentUserId
		) {
			return (
				<div className="extra content">
					<div className="ui two buttons">
						<Link
							to={`/trips/edit/${trip._id}`}
							className="ui blue basic button"
						>
							Edit
						</Link>
						<Link
							to={`/trips/delete/${trip._id}`}
							className="ui basic red button"
						>
							Delete
						</Link>
					</div>
				</div>
			)
		}
	}

	handleSaveClick = (e, { rating }) => {
		if (rating === 1) {
			this.props.saveTrip(this.props.trip._id)
			this.props.fetchTrips()
		} else {
			this.props.unsaveTrip(this.props.trip._id)
			this.props.fetchTrips()
		}
	}

	render() {
		const {
			_id,
			title,
			distance,
			duration,
			stops,
			creatorName,
			saves
		} = this.props.trip

		let stopsList = []
		let stopsString = ""

		if (stops) {
			stopsList = stops.map(stop => {
				return stop.place.split(",")[0]
			})
		}

		if (stopsList.length > 2) {
			stopsString = `${stopsList[0]} to ${_.last(stopsList)} via `

			for (let i = 1; i < stopsList.length - 1; i++) {
				if (i === stopsList.length - 2) {
					stopsString = stopsString + stopsList[i] + "."
				} else {
					stopsString = stopsString + stopsList[i] + " > "
				}
			}
		} else {
			stopsString = `${stopsList[0]} to ${_.last(stopsList)}. `
		}

		return (
			<div className="card" style={{ padding: 0, minHeight: 70 }}>
				<div className="content">
					<Link to={`/trips/show/${_id}`}>
						<div className={this.props.classes.hover}>
							<div className="right floated ui label">
								<em>{`Created by ${creatorName}`}</em>
							</div>
							<div style={{ marginBottom: 30 }}>
								<h3 className="header item">{title}</h3>
								<div className="meta">{stopsString}</div>
							</div>
							<div className="item">
								<div className="ui label">
									Road Time
									<div className="detail">{duration.text}</div>
								</div>
							</div>
							<div className="item">
								<div className="ui label">
									Distance
									<div className="detail">{distance.text}</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className="content">
					<div style={{ paddingLeft: 10 }}>
						{this.isLoggedIn(_id)}
						{` ${saves} saves`}
					</div>
				</div>
				{this.renderEditAndDeleteButtons(this.props.trip)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.auth._id,
		currentUserName: state.auth.currentUserName,
		savedTrips: state.savedTrips
	}
}

const wrappedComponent = connect(mapStateToProps, {
	saveTrip,
	unsaveTrip,
	fetchSavedTrips,
	fetchTrips
})(TripCard)

export default withStyles(styles)(wrappedComponent)
