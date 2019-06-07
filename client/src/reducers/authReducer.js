import { FETCH_USER } from "../actions/types"

const INITIAL_STATE = {
	_id: null,
	isSignedIn: false
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				_id: action.payload._id,
				isSignedIn: action.payload.isSignedIn,
				currentUserName: action.payload.firstName
			}
		default:
			return state
	}
}
