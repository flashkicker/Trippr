import React, { Component } from "react"
import { Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"

import * as actions from "../actions"
import Header from "./Header"
import ListOfTrips from "./ListOfTrips"
import CreateTrip from "./CreateTrip"
import SavedTrips from "./SavedTrips"
import EditTrip from "./EditTrip"
import DeleteTrip from "./DeleteTrip"
import ShowTrip from "./ShowTrip"
import history from "../history"

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		return (
			<div className="ui container">
				<Router history={history}>
					<div>
						<Header />
						<Route path="/" exact component={ListOfTrips} onChange={actions.fetchTrips} />
						<Route path="/trips/new" exact component={CreateTrip} />
						<Route path="/trips/saved" exact component={SavedTrips} />
						<Route path="/trips/edit/:id" exact component={EditTrip} />
						<Route path="/trips/delete/:id" exact component={DeleteTrip} />
						<Route path="/trips/show/:id" exact component={ShowTrip} />   
					</div>
				</Router>
				<ToastContainer />
			</div>
		)
	}
}

export default connect(null, actions)(App)
