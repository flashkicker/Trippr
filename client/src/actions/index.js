import axios from "axios"
import history from "../history"
import {
	FETCH_USER,
	CREATE_TRIP,
	FETCH_TRIP,
	FETCH_TRIPS,
	EDIT_TRIP,
	DELETE_TRIP,
	GET_PREDICTIONS,
	GET_NUMBER_OF_STOPS,
	FETCH_MY_TRIPS,
	SAVE_TRIP,
	UNSAVE_TRIP,
	FETCH_SAVED_TRIPS
} from "./types"

export const fetchUser = () => {
	return async dispatch => {
		let res = await axios.get("/api/user")

		dispatch({ type: FETCH_USER, payload: res.data })
	}
}

export const createTrip = formValues => {
	return async dispatch => {
		const response = await axios.post("/api/trips", formValues)

		dispatch({
			type: CREATE_TRIP,
			payload: response.data
		})

		history.push("/")
	}
}

export const fetchTrips = () => {
	return async dispatch => {
		const response = await axios.get("/api/trips")

		dispatch({
			type: FETCH_TRIPS,
			payload: response.data
		})
	}
}

export const fetchTrip = id => {
	return async dispatch => {
		const response = await axios.get(`/api/trip/?id=${id}`)

		dispatch({
			type: FETCH_TRIP,
			payload: response.data[0]
		})
	}
}

export const editTrip = (id, formValues) => {
	return async dispatch => {
		const response = await axios.patch(`/api/trip/?id=${id}`, formValues)

		dispatch({
			type: EDIT_TRIP,
			payload: response.data
		})

		history.push("/")
	}
}

export const deleteTrip = id => {
	return async dispatch => {
		await axios.delete(`/api/trip/?id=${id}`)

		dispatch({
			type: DELETE_TRIP,
			payload: id
		})

		history.push("/")
	}
}

export const getPlacesSuggestions = formValues => {
	return async dispatch => {
		const response = await axios.post("/api/maps", formValues)

		dispatch({
			type: GET_PREDICTIONS,
			payload: response.data
		})
	}
}

export const getNumberOfStops = numberOfStops => {
	return {
		type: GET_NUMBER_OF_STOPS,
		payload: numberOfStops
	}
}

export const fetchMyTrips = () => {
	return async dispatch => {
		const response = await axios.get("/api/mytrips")

		dispatch({
			type: FETCH_MY_TRIPS,
			payload: response.data
		})
	}
}

export const saveTrip = id => {
	return async dispatch => {
		await axios.post(`/api/savetrip/?id=${id}`)

		dispatch({
			type: SAVE_TRIP,
			payload: id
		})
	}
}

export const unsaveTrip = (id) => {
	return async (dispatch) => {
		await axios.post(`/api/unsavetrip?id=${id}`)

		dispatch({
			type: UNSAVE_TRIP,
			payload: id
		})
	}
}

export const fetchSavedTrips = () => {
	return async dispatch => {
		const response = await axios.get("/api/savedtrips")
		
		dispatch({
			type: FETCH_SAVED_TRIPS,
			payload: response.data
		})
	}
}
