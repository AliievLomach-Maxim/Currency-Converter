import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Select, Row, Input, Col, Typography, Card } from 'antd'
import {
	getConvert,
	getEUR,
	getPeriodEUR,
	getPeriodUSD,
	getUSD,
} from '../../store/queryResult'
import moment from 'moment'
import { Column } from '@ant-design/charts'
const Bookings = () => {
	const dispatch = useDispatch()
	const [currentCurrency] = useState(['USD', 'EUR', 'UAH'])
	const [firstCurrency, setFirstCurrency] = useState()
	const [secondCurrency, setSecondCurrency] = useState()
	const [secondValue, setSecondValue] = useState()
	const [firstValue, setFirstValue] = useState()
	const [changeFirstValue, setChangeFirstValue] = useState()
	const [changeSecondValue, setChangeSecondValue] = useState()
	const [getFirst, setGetFirst] = useState(false)
	const [getSecond, setGetSecond] = useState(false)
	const [data, setData] = useState()

	const { queryResult, loading, usd, eur, periodUSD, periodEUR } = useSelector(
		(state) => state.queryResult
	)

	useEffect(() => {
		dispatch(getUSD('usd', 'uah'))
		dispatch(getEUR('eur', 'uah'))
		setFirstCurrency('UAH')
		setSecondCurrency('USD')
		dispatch(
			getPeriodUSD(
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date().setFullYear(2021)).format('YYYY-MM-DD')
			)
		)
		dispatch(
			getPeriodEUR(
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date().setFullYear(2021)).format('YYYY-MM-DD')
			)
		)
	}, [])

	useEffect(() => {
		changeFirstValue ? getSecondValue(changeFirstValue) : getSecondValue(100)
	}, [changeFirstValue, firstCurrency])

	useEffect(() => {
		changeSecondValue
			? getFirstValue(changeSecondValue)
			: getFirstValue(secondValue)
	}, [changeSecondValue, secondCurrency])

	const getSecondValue = (value) => {
		setGetSecond(true)
		dispatch(getConvert(secondCurrency, firstCurrency, value))
	}

	const getFirstValue = (value) => {
		setGetFirst(true)
		dispatch(getConvert(firstCurrency, secondCurrency, value))
	}

	useEffect(() => {
		if (getSecond) {
			setSecondValue(queryResult.result)
			setGetSecond(false)
		}
		if (getFirst) {
			setFirstValue(queryResult.result)
			setGetFirst(false)
		}
	}, [queryResult])

	const selectFirstBefore = () => {
		return (
			<Select
				name='firstCurrency'
				value={firstCurrency}
				onSelect={(e) => setFirstCurrency(e)}
			>
				{currentCurrency.map((value, index) => {
					return (
						value !== secondCurrency && (
							<Select.Option key={index} value={value}>
								{value}
							</Select.Option>
						)
					)
				})}
			</Select>
		)
	}

	const selectSecondBefore = () => {
		return (
			<Select
				name='secondCurrency'
				value={secondCurrency}
				placeholder='Chose'
				onSelect={(e) => setSecondCurrency(e)}
			>
				{currentCurrency.map((value, index) => {
					return (
						value !== firstCurrency && (
							<Select.Option key={index} value={value}>
								{value}
							</Select.Option>
						)
					)
				})}
			</Select>
		)
	}

	useEffect(() => {
		if (periodUSD && periodEUR) {
			const arrKeysUSD = Object.keys(periodUSD.quotes)
			const arrSortByMonth = []
			const data = []
			for (let i = 0; i < arrKeysUSD.length; i++) {
				arrKeysUSD[i].slice(0, -3) !== arrKeysUSD[i - 1]?.slice(0, -3) &&
					arrSortByMonth.push(arrKeysUSD[i])
			}
			arrSortByMonth.map((day) => {
				data.push({
					value: periodUSD.quotes[day].USDUAH,
					year: day,
					name: 'USD',
				})
				data.push({
					value: periodEUR.quotes[day].EURUAH,
					year: day,
					name: 'EUR',
				})
			})
			setData(data)
		}
	}, [periodUSD])

	const config = {
		data: data && data,
		isGroup: true,
		height: 200,
		xField: 'year',
		yField: 'value',
		seriesField: 'name',
		dodgePadding: 2,
		intervalPadding: 20,
	}
	
	return (
		!loading &&
		data && (
			<>
				<Row justify='center' style={{ padding: 14 }}>
					<Col style={{ padding: 14 }} xs={{ span: 24 }} sm={{ span: 20 }}>
						<Card
							title={
								<>
									<Typography.Title level={3} style={{ textAlign: 'center' }}>
										{`1$ = ${usd.quotes?.USDUAH || '100.1000'}uah`}
									</Typography.Title>
									<Typography.Title level={3} style={{ textAlign: 'center' }}>
										{`1€ = ${eur.quotes?.EURUAH || '100.1000'}uah`}
									</Typography.Title>
								</>
							}
							bordered={false}
							style={{
								width: '100%',
							}}
						>
							<Column {...config} />
						</Card>
					</Col>
				</Row>
				<Row align='center'>
					<Form style={{ width: 700, padding: 14, margin: '30px 0 80px' }}>
						<Row justify='space-between'>
							<Col
								xs={{ span: 18, offset: 3 }}
								sm={{ span: 10, offset: 0 }}
								xl={{ span: 10, offset: 0 }}
							>
								<Form.Item>
									<Input
										onChange={(e) => {
											setChangeFirstValue(e.target.value)
										}}
										placeholder={usd.quotes?.USDUAH * 100}
										addonBefore={selectFirstBefore()}
										value={firstValue}
										onFocus={() => setFirstValue()}
									/>
								</Form.Item>
							</Col>
							<Col
								xs={{ span: 18, offset: 3 }}
								sm={{ span: 10, offset: 0 }}
								xl={{ span: 10, offset: 0 }}
							>
								<Form.Item>
									<Input
										onChange={(e) => setChangeSecondValue(e.target.value)}
										placeholder={100}
										onFocus={() => setSecondValue()}
										addonBefore={selectSecondBefore()}
										value={secondValue}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Row>
			</>
		)
	)
}

export default Bookings
