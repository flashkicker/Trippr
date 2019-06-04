import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Rating, Image } from "semantic-ui-react"
import { connect } from "react-redux"

class TripCard extends Component {
	renderEditAndDeleteButtons = trip => {
		if (this.props.renderEditAndDeleteButtons && trip._user === this.props.currentUserId) {
			return (
				<div className="ui two buttons">
					<Link to={`/trips/edit/${trip._id}`} className="ui blue basic button">
						Edit
					</Link>
					<Link
						to={`/trips/delete/${trip._id}`}
						className="ui basic red button"
					>
						Delete
					</Link>
				</div>
			)
		}
	}

	render() {
		const { _id, title } = this.props.trip

		return (
			<div key={_id} className="card" style={{ padding: 10, minHeight: 70 }}>
				<div className="content">
					<Image
						floated="right"
						size="tiny"
						src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
					/>
					<Link to={`/trips/show/${_id}`}>
						<h3 className="header item">{title}</h3>
					</Link>
					<div className="description">Description</div>
				</div>
				<div className="content">
					<span className="right floated">
						<Rating className="heart outline like icon" />
					</span>
					<Rating icon="star" disabled maxRating={5} />
					<div>23 Ratings</div>
				</div>
				<div className="extra content">
					{this.renderEditAndDeleteButtons(this.props.trip)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.auth._id
	}
}

export default connect(mapStateToProps)(TripCard)
