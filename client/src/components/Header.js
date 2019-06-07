import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Header extends Component {
	renderSignOutButton() {
		switch (this.props.auth.isSignedIn) {
			case null:
				return
			case false:
				return (
					<div className="right menu">
						<a href="/auth/google" className="item">
							<i className="google icon" />
							Sign In WIth Google
						</a>
					</div>
				)
			default:
				return (
					<div className="right menu">
						<a href="/api/logout" className="item">
							Sign Out
						</a>
					</div>
				)
		}
	}

	renderTabs() {
		switch (this.props.auth.isSignedIn) {
			case null:
				return
			case false:
				return
			default:
				return (
					<div className="left menu">
						<Link to="/trips/new" className="item">
							Create
						</Link>
						<Link to="/trips/saved" className="item">
							View Saved
						</Link>
						<Link to="/trips/my" className="item">
							My Trips
						</Link>
					</div>
				)
		}
	}

	render() {
		return (
			<div className="ui stackable container menu" style={{ padding: 5, marginTop: 5 }}>
				<div className="header item">
					<h1 className="ui header">Trippr</h1>
				</div>
				<Link to="/" className="item">
					Explore
				</Link>
				{this.renderTabs()}
				{this.renderSignOutButton()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log(state)
	return { auth: state.auth }
}

export default connect(mapStateToProps)(Header)
