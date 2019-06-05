import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Icon } from "semantic-ui-react"
import axios from "axios"
import _ from "lodash"

import { fetchTrip } from "../actions"

class ShowTrip extends Component {
	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.id)
	}

	renderList() {
		return this.props.trip.stops.map((stop, index) => {
			return (
				<div className="card">
					<div className="content">
						<div className="ui grid">
							<div className="six wide column">
								<Button circular active disabled>{`${index + 1}`}</Button>
							</div>
							<div className="eight wide column">
								<h3 className="header item">{`${stop.place}`}</h3>
							</div>
						</div>
					</div>
				</div>
			)
		})
	}

	generateUrl = () => {
        let waypoints = ""
		const { stops } = this.props.trip
		let url = `https://www.google.com/maps/dir/?api=1&origin=${
			this.props.trip.stops[0].place
        }&destination=${_.last(this.props.trip.stops).place}&waypoints=`
        
        for (let i = 1; i < stops.length - 1; i++) {
            waypoints = waypoints + '|' + stops[i].place
        }
        
        return `${url}${waypoints}`
	}

	render() {
		if (!this.props.trip) {
			return <div>Loading...</div>
        }
        this.generateUrl()

		const { title } = this.props.trip

		return (
			<div>
				<h1 className="header item">{title}</h1>
				<div className="ui container" style={{ padding: 40 }}>
					<div className="ui two column very relaxed grid">
						<div className="column">
							<div className="ui one cards">{this.renderList()}</div>
						</div>
						<div className="column">Map goes here</div>
					</div>
				</div>
				<div className="container" style={{ padding: 40 }}>
					<Button icon labelPosition="left">
						<Icon name="google" />
						<a
                            href={this.generateUrl()}
                            target="_blank"
						>
							View in Google Maps
						</a>
					</Button>
				</div>
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
		fetchTrip
	}
)(ShowTrip)
