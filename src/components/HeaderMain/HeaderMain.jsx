import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Layout, Row, Select, Spin, Typography } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import uk_UA from 'antd/lib/locale/uk_UA'
import { getLocal } from '../../store/local'
const { Option } = Select
const { Header } = Layout

const HeaderMain = () => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()
	const { loading } = useSelector((state) => state.queryResult)
	const changeLanguage = (language) => {
		i18n.changeLanguage(language)
		if (language === 'en') {
			dispatch(getLocal(enUS))
		} else if (language === 'ua') {
			dispatch(getLocal(uk_UA))
		}
	}

	return !loading ? (
		<Header>
			<Row justify='space-between'>
				<Col span={23}>
					<Typography.Title
						className='prop-text'
						style={{
							padding: 8,
						}}
						level={1}
					/>
				</Col>
				<Col span={1}>
					<Select
						style={{ margin: 0 }}
						bordered={false}
						defaultValue={i18n.language}
						dropdownStyle={{ width: 20 }}
					>
						<Option id={1} value='en'>
							<a onClick={() => changeLanguage('en')}>En</a>
						</Option>

						<Option value='hi'>
							<a onClick={() => changeLanguage('ua')}>Ua</a>
						</Option>
					</Select>
				</Col>
			</Row>
		</Header>
	) : (
		<Spin className='example' size='large' />
	)
}

export default HeaderMain
