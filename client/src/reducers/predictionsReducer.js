import { GET_PREDICTIONS } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case GET_PREDICTIONS:
            return action.payload
        default:
            return state 
    }
}