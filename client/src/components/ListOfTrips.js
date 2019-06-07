import React, { Component } from "react"
import { connect } from "react-redux"

import TripCard from "./TripCard"

class ListOfTrips extends Component {
	filterList = trips => {
		if (this.props.renderEditAndDeleteButtons) {
			return trips.filter(trip => {
				return trip._user === this.props.currentUserId
			})
		}

		return trips
	}

	compare = (a, b) => {
		if (a.saves < b.saves) {
			return 1
		}
		if (a.saves > b.saves) {
			return -1
		}
		return 0
	}

	renderList = () => {
		const trips = this.filterList(this.props.trips).sort(this.compare)

		return trips.map(trip => {
			return (
				<TripCard
					key={trip._id}
					trip={trip}
					renderEditAndDeleteButtons={this.props.renderEditAndDeleteButtons}
				/>
			)
		})
	}

	render() {
		return <div className="ui stackable two cards">{this.renderList()}</div>
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.auth._id
	}
}

export default connect(mapStateToProps)(ListOfTrips)
