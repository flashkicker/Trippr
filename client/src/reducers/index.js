import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

import authReducer from "./authReducer"
import tripReducer from "./tripReducer"
import predictionsReducer from './predictionsReducer'
import stopsReducer from './stopsReducer'

export default combineReducers({
	auth: authReducer,
	trips: tripReducer,
	predictions: predictionsReducer,
	numberOfStops: stopsReducer,
	form: formReducer
})
