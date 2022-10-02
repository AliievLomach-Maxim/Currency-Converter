import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { localReducer } from './local'
import { queryResultReducer } from './queryResult'

const reducers = combineReducers({
	local: localReducer,
	queryResult: queryResultReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
