const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@font-family': 'Jura Medium, sans-serif',
							'@primary-color': '#55A9AD',
							'@border-radius-base': '16px',
							'@input-height-base': '40px',
							'@white': '#55A9AD',
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
