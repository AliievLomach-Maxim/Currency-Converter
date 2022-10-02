import React from 'react'
import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Affix, Layout } from 'antd'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
const { Footer } = Layout

const ContentPage = () => {
	const { t } = useTranslation()
	return (
		<Layout>
			<HeaderMain />
			<Layout>
				<Outlet />
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
			</Layout>
		</Layout>
	)
}

export default ContentPage
