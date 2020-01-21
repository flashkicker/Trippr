import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Icon, Image, Rating } from "semantic-ui-react"
import _ from "lodash"

import { fetchTrip } from "../actions"
import MapComponent from "./MapComponent"

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
							<div className="three wide column">
								<Button circular active disabled>{`${index + 1}`}</Button>
							</div>
							<div className="thirteen wide column">
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
			waypoints = waypoints + "|" + stops[i].place
		}

		return `${url}${waypoints}`
	}

	// generateStaticMap = () => {
	// 	let markers = ""
	// 	let path = ""
	// 	const { stops } = this.props.trip
	// 	let url = `https://maps.googleapis.com/maps/api/staticmap?size=500x400&key=AIzaSyAZn7wclMHXGAiymldyKJn1qAdDM84vk5A&markers=size:mid`

	// 	for (let i = 0; i < stops.length; i++) {
	// 		markers = markers + "|" + stops[i].place
	// 		path = path + "|" + stops[i].place
	// 	}
	// 	console.log(`${url}${markers}&path=color:0x0000ff80|weight:2|geodesic:true${path}`)
	// 	return `${url}${markers}&path=color:0x0000ff80|weight:2|geodesic:true${path}`
	// }

	render() {
		if (!this.props.trip) {
			return <div>Loading...</div>
		}

		const { title, distance, duration, creatorName, saves } = this.props.trip

		return (
			<div>
				<div className="ui stackable container">
					<div className="ui left aligned two column very relaxed stackable grid">
						<div className="column">
							<div className="ui relaxed items">
								<div className="item">
									<h1 className="header item">{title}</h1>
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
								<div className="item">
									<Button icon labelPosition="left">
										<Icon name="google" />
										<a href={this.generateUrl()} target="_blank">
											View in Google Maps
										</a>
									</Button>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="ui right floated grid" style={{ marginTop: 18 }}>
								<div className="sixteen wide column">
									<div className="ui label" style={{ marginBottom: 15 }}>
										<em>{`Created by ${creatorName}`}</em>
									</div>
									<div className="item">
										<Rating className="heart outline like icon" rating={1} />
										{` ${saves} saves`}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="ui container">
					<div className="ui two column very relaxed stackable grid">
						<div className="column">
							<div className="ui one cards">{this.renderList()}</div>
						</div>
						<div className="column">
							<MapComponent isMarkerShown stops={this.props.trip.stops} />
						</div>
					</div>
				</div>
				<div className="container" style={{ padding: 40 }} />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		trip: state.trips[ownProps.match.params.id],
		currentUserName: state.auth.currentUserName
	}
}

export default connect(
	mapStateToProps,
	{
		fetchTrip
	}
)(ShowTrip)
