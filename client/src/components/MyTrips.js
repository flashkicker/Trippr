import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchMyTrips } from "../actions"
import ListOfTrips from "./ListOfTrips"

class MyTrips extends Component {
	componentDidMount() {
        this.props.fetchMyTrips()
    }

	render() {
		return (
			<div>
				<h1 className="header item" style={{ marginBottom: 40 }}>
					My Road Trips
				</h1>
                <ListOfTrips trips={this.props.trips} renderEditAndDeleteButtons={true} />
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
		fetchMyTrips
	}
)(MyTrips)
