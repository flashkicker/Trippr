import { GET_NUMBER_OF_STOPS } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_NUMBER_OF_STOPS:
            return action.payload
        default:
            return state
    }
}