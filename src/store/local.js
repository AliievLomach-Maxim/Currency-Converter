import enUS from 'antd/lib/locale/en_US'

const GET_LOCAL = 'GET_LOCAL'

export const getLocal = (local) => {
	return {
		type: GET_LOCAL,
		payload: local,
	}
}

const InitialState = {
	local: enUS,
}

export const localReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_LOCAL: {
			return {
				...state,
				local: action.payload,
			}
		}
		default:
			return state
	}
}
