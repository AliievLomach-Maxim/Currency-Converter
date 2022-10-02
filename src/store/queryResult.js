import { getAxios } from '../utils/axios'

const GET_RESULT = 'GET_RESULT'
const GET_RESULT_PERIOD_USD = 'GET_RESULT_PERIOD_USD'
const GET_RESULT_PERIOD_EUR = 'GET_RESULT_PERIOD_EUR'
const GET_RESULT_EUR = 'GET_RESULT_EUR'
const GET_RESULT_USD = 'GET_RESULT_USD'
const SET_STATUS = 'SET_STATUS'
const LOADING_RESULT = 'LOADING_RESULT'

const URL = process.env.REACT_APP_URL

export const getConvert = (to, from, amount) => async (dispatch) => {
	const url = `${URL}/convert?to=${to}&from=${from}&amount=${amount}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getResult(response))
}

export const getPeriodUSD = (to, from) => async (dispatch) => {
	const url = `${URL}/timeframe?start_date=${from}&end_date=${to}&currencies=uah&source=usd`
	const response = await getAxios(url, dispatch)
	response && dispatch(getResultPeriodUSD(response))
}

export const getPeriodEUR = (to, from) => async (dispatch) => {
	const url = `${URL}/timeframe?start_date=${from}&end_date=${to}&currencies=uah&source=eur`
	const response = await getAxios(url, dispatch)
	response && dispatch(getResultPeriodEUR(response))
}

export const getUSD = (source, currencies) => async (dispatch) => {
	dispatch(loadingResult(true))
	const url = `${URL}/live?source=${source}&currencies=${currencies}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getResultUSD(response))
	dispatch(loadingResult(false))
}

export const getEUR = (source, currencies) => async (dispatch) => {
	dispatch(loadingResult(true))
	const url = `${URL}/live?source=${source}&currencies=${currencies}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getResultEUR(response))
	dispatch(loadingResult(false))
}

const loadingResult = (boolean) => ({
	type: LOADING_RESULT,
	payload: boolean,
})

const getResult = (res) => ({
	type: GET_RESULT,
	payload: res,
})

const getResultPeriodUSD = (res) => ({
	type: GET_RESULT_PERIOD_USD,
	payload: res,
})

const getResultPeriodEUR = (res) => ({
	type: GET_RESULT_PERIOD_EUR,
	payload: res,
})

const getResultEUR = (res) => ({
	type: GET_RESULT_EUR,
	payload: res,
})

const getResultUSD = (res) => ({
	type: GET_RESULT_USD,
	payload: res,
})

export const setStatus = (status) => ({
	type: SET_STATUS,
	payload: status,
})

const InitialState = {
	queryResult: '',
	periodUSD: '',
	periodEUR: '',
	eur: '',
	usd: '',
	status: 200,
	loading: false,
}

export const queryResultReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_RESULT:
			return { ...state, queryResult: action.payload, loading: false }
		case GET_RESULT_PERIOD_USD:
			return { ...state, periodUSD: action.payload, loading: false }
		case GET_RESULT_PERIOD_EUR:
			return { ...state, periodEUR: action.payload, loading: false }
		case GET_RESULT_EUR:
			return { ...state, eur: action.payload, loading: false }
		case GET_RESULT_USD:
			return { ...state, usd: action.payload, loading: false }
		case SET_STATUS:
			return { ...state, status: action.payload }
		case LOADING_RESULT:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
