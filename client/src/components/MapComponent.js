/* eslint-disable no-undef */
import React from "react"
import {
	GoogleMap,
	withGoogleMap,
	withScriptjs,
	DirectionsRenderer
} from "react-google-maps"
import _ from "lodash"
import { compose, withProps, lifecycle } from "recompose"

const MapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?key=AIzaSyAZn7wclMHXGAiymldyKJn1qAdDM84vk5A&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px`, width: "500px" }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const DirectionsService = new google.maps.DirectionsService()
			// console.log(_.last(this.props.stops).coordinates)
			const origin = this.props.stops[0].coordinates
			const destination = _.last(this.props.stops).coordinates
			let waypoints = []
			for (let i = 1; i < this.props.stops.length - 1; i++) {
				let waypoint = this.props.stops[i].coordinates
				waypoints.push({
					location: new google.maps.LatLng(waypoint.lat, waypoint.lng),
					stopover: true
				})
			}

			// console.log(waypoints)

			DirectionsService.route(
				{
					origin: new google.maps.LatLng(origin.lat, origin.lng),
					destination: new google.maps.LatLng(destination.lat, destination.lng),
					waypoints,
					travelMode: google.maps.TravelMode.DRIVING
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						})
					} else {
						console.error(`error fetching directions ${result}`)
					}
				}
			)
		}
	})
)(props => {
	return (
		<GoogleMap
			options={{
				gestureHandling: "cooperative",
				zoomControl: true,
				mapTypeControl: false
			}}
		>
			{props.directions && <DirectionsRenderer directions={props.directions} />}
		</GoogleMap>
	)
})

export default MapComponent
