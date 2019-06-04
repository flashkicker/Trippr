import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchTrips } from "../actions"
import ListOfTrips from "./ListOfTrips"

class ExploreTrips extends Component {
	componentDidMount() {
		this.props.fetchTrips()
    }

	render() {
		return (
			<div>
				<h1 className="header item" style={{ marginBottom: 40 }}>
					Explore Road Trips
				</h1>
                <ListOfTrips trips={this.props.trips} renderEditAndDeleteButtons={false} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		trips: Object.values(state.trips)
	}
}

export default connect(
	mapStateToProps,
	{
		fetchTrips
	}
)(ExploreTrips)
