import colors from 'vuetify/es5/util/colors';

export default {
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: '%s',
		title: 'Чат на Nuxt.js',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: [],
	plugins: ['@/plugins/socket.client'],
	components: true,
	buildModules: ['@nuxtjs/vuetify'],
	modules: [],
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			themes: {
				light: {
					primary: '#1976D2',
					secondary: '#424242',
					accent: '#82B1FF',
					error: '#FF5252',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FFC107',
				}
			},
		},
	},
	build: {},
	pageTransition: 'fade-transition',
};
