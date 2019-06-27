import { GET_NUMBER_OF_STOPS } from '../actions/types'

const INITIAL_STATE = {
    numberOfStops: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NUMBER_OF_STOPS:
            return action.payload
        default:
            return state
    }
}