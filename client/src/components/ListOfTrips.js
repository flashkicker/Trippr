import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchTrips } from "../actions"

class ListOfTrips extends Component {
	componentDidMount() {
		this.props.fetchTrips()
	}

	renderEditAndDeleteButtons = trip => {
		if (trip._user === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/trips/edit/${trip._id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/trips/delete/${trip._id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			)
		}
	}

	renderList = () => {
		return this.props.trips.map(trip => {
			return (
				<div
					className="item"
					key={trip._id}
					style={{ padding: 10, minHeight: 70 }}
				>
					{this.renderEditAndDeleteButtons(trip)}
					<i className="large middle aligned icon car" />
					<div className="content">
						<Link to={`/trips/show/${trip._id}`}>
							<h3 className="header item">{trip.title}</h3>
						</Link>
					</div>
				</div>
			)
		})
	}

	render() {
		return (
			<div>
				<h1 className="header item" style={{ marginBottom: 40 }}>
					Road Trips
				</h1>
				<div className="ui big celled list">{this.renderList()}</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		trips: Object.values(state.trips),
		currentUserId: state.auth._id
	}
}

export default connect(
	mapStateToProps,
	{
		fetchTrips
	}
)(ListOfTrips)
