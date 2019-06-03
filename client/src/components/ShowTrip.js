import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrip } from '../actions'

class ShowTrip extends Component {
    componentDidMount() {
        this.props.fetchTrip(this.props.match.params.id)
    }

    render() {
        if(!this.props.trip) {
            return <div>Loading...</div>
        }

        const { title } = this.props.trip

        return (
            <div>
                <h1>{title}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trip: state.trips[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchTrip
})(ShowTrip)