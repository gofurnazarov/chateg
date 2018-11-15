export default function ({ isHMR, app, store, route, params, error, redirect }) {
	// If middleware is called from hot module replacement, ignore it
	if (isHMR) {
		return
	}

	switch (route.fullPath) {
		case '/':
			if (store.state.locale != 'en') {
				store.commit('setLanguage', 'en')
				app.i18n.locale = store.state.locale
			}	
			break;
		case '/ru':
				store.commit('setLanguage', 'ru')
				app.i18n.locale = store.state.locale
			break;
		case '/uz':
				store.commit('setLanguage', 'uz')
				app.i18n.locale = store.state.locale
				console.log(route.fullPath == '/uz')
			break;
	}
	
	if (params.lang) {
		const locale = params.lang;

		if (store.state.locales.includes(locale)) {
			store.commit('setLanguage', locale)
			app.i18n.locale = store.state.locale

			if (locale == 'en') {
				return redirect('/' + route.name)
			}

			return
		} else {
			return error({ message: 'This page could not be found.', statusCode: 404 })
		}
	} 	
} 