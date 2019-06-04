import _ from "lodash"
import { FETCH_SAVED_TRIPS, SAVE_TRIP, UNSAVE_TRIP } from "../actions/types"

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_SAVED_TRIPS:
			return action.payload
		case SAVE_TRIP:
			return [...state, action.payload]
		case UNSAVE_TRIP:
			return _.remove(state, (trip) => {
                return trip !== action.payload
            })
		default:
			return state
	}
}
