import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.less'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ContentPage from './pages/ContentPage/ContentPage'
import Content from './components/Content/Content'

function App() {
	const { status } = useSelector((state) => state.queryResult)

	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<ErrorPage status={404} />} />
				<Route
					element={
						status === 200 ? <ContentPage /> : <ErrorPage status={status} />
					}
				>
					<Route path='/' element={<Content />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
