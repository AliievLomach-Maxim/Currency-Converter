import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Result, Row, Col, Affix } from 'antd'
import { useDispatch } from 'react-redux'
import { setStatus } from '../../store/queryResult'
import { Footer } from 'antd/lib/layout/layout'

const ErrorPage = ({ status }) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	return (
		<>
			<Row style={{ height: '100vh' }} align='middle'>
				<Col span={12} offset={6}>
					<Result
						status={status === 429 ? 500 : status}
						title={status || 'There are some problems with your operation'}
						subTitle={
							status === 404
								? `${t('errors.404.text')}`
								: status === 429
								? `${t('errors.429.text')}`
								: `${t('errors.some.text')}`
						}
						extra={
							<Button
								type='primary'
								onClick={() => {
									dispatch(setStatus(200))
									navigate('/')
								}}
							>
								{`${t('button.BackHome')}`}
							</Button>
						}
					/>
				</Col>
			</Row>
			<Affix
				offsetBottom={0}
				style={{ position: 'fixed', top: '95%', width: '100%' }}
			>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					{`2022 ${t('footer.main')}`}
				</Footer>
			</Affix>
		</>
	)
}

export default ErrorPage
