import _ from "lodash"
import {
	CREATE_TRIP,
	FETCH_TRIP,
	FETCH_TRIPS,
	EDIT_TRIP,
	DELETE_TRIP,
	FETCH_MY_TRIPS
} from "../actions/types"

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_TRIP:
			return { ...state, [action.payload._id]: action.payload }
		case EDIT_TRIP:
			return { ...state, [action.payload._id]: action.payload }
		case CREATE_TRIP:
			return { ...state, [action.payload._id]: action.payload }
		case DELETE_TRIP:
			return _.omit(state, action.payload)
		case FETCH_TRIPS:
			return { ...state, ..._.mapKeys(action.payload, "_id") }
		case FETCH_MY_TRIPS:
			return { ..._.mapKeys(action.payload, "_id") }
		default:
			return state
	}
}
