import React, { Component } from "react"
import { connect } from "react-redux"
import _ from 'lodash'

import { fetchSavedTrips, fetchTrips } from "../actions"
import ListOfTrips from "./ListOfTrips"

class SavedTrips extends Component {
	componentDidMount() {
        this.props.fetchSavedTrips()
        this.props.fetchTrips()
	}

	render() {
		return (
			<div>
				<h1 className="header item" style={{ marginBottom: 40 }}>
					Your Saved Road Trips
				</h1>
				<ListOfTrips
					trips={this.props.tripsToRender}
					renderEditAndDeleteButtons={false}
				/>
			</div>
		)
	}
}

export const mapStateToProps = (state) => {
    let trips = Object.keys(state.trips)
    const intersection = trips.filter(trip => state.savedTrips.includes(trip))
    const tripsToRender = Object.values(_.pick(state.trips, intersection))

    return {
        tripsToRender
    }
}

export default connect(
	mapStateToProps,
	{
        fetchSavedTrips,
        fetchTrips
	}
)(SavedTrips)
