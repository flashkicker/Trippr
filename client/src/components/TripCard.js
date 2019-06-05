import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Rating, Image } from "semantic-ui-react"
import { connect } from "react-redux"
import faker from "faker"

import { saveTrip, unsaveTrip, fetchSavedTrips } from "../actions"

class TripCard extends Component {
	componentDidMount() {
		this.props.fetchSavedTrips()
	}

	isTripSaved = tripId => {
		const { savedTrips } = this.props

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
				<div className="ui two buttons">
					<Link to={`/trips/edit/${trip._id}`} className="ui blue basic button">
						Edit
					</Link>
					<Link
						to={`/trips/delete/${trip._id}`}
						className="ui basic red button"
					>
						Delete
					</Link>
				</div>
			)
		}
	}

	handleSaveClick = (e, { rating }) => {
		if (rating === 1) {
			this.props.saveTrip(this.props.trip._id)
		} else {
			this.props.unsaveTrip(this.props.trip._id)
		}
	}

	render() {
		const { _id, title, distance, duration } = this.props.trip

		return (
			<div className="card" style={{ padding: 10, minHeight: 70 }}>
				<div className="content">
					<div className="right floated ui label">
						<em>{`Created by ${this.props.currentUserName}`}</em>
					</div>
					<div style={{ marginBottom: 30 }}>
						<Link to={`/trips/show/${_id}`}>
							<h3 className="header item">{title}</h3>
						</Link>
					</div>
					<div className="ui label">
						Duration
						<div className="detail">{duration.text}</div>
					</div>
					<div className="ui label">
						Duration
						<div className="detail">{distance.text}</div>
					</div>
				</div>
				<div className="content">
					<span className="right floated">{this.isTripSaved(_id)}</span>
					<Rating
						icon="star"
						disabled
						rating={5}
						maxRating={5}
					/>
					<div>{`${faker.random.number(50)} ratings`}</div>
				</div>
				<div className="extra content">
					{this.renderEditAndDeleteButtons(this.props.trip)}
				</div>
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

export default connect(
	mapStateToProps,
	{
		saveTrip,
		unsaveTrip,
		fetchSavedTrips
	}
)(TripCard)
