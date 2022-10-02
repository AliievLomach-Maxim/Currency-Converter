import { setStatus } from '../store/queryResult'
const axios = require('axios')
const KEY = process.env.REACT_APP_KEY

export const getAxios = async (url, dispatch) => {
	try {
		const response = await axios.get(url, {
			headers: { apikey: KEY },
		})
		dispatch(setStatus(200))
		return response.data
	} catch (error) {
		dispatch(setStatus(error.response.status))
	}
}
