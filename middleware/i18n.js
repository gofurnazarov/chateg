export default function ({ isHMR, app, store, route, params, error, redirect }) {
	// If middleware is called from hot module replacement, ignore it
	if (isHMR) {
		return
	}

	if (store.state.locale && route.fullPath == '/') 
	{
		const locale = store.state.locale;
		
		if(locale == 'ru') {
			return redirect('/ru')
		} else if (locale == 'uz') {
			return redirect('/uz')
		} 
	} 
	else 
	{
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
				break;
			case '/en': 
				store.commit('setLanguage', 'en')
				app.i18n.locale = store.state.locale
				return redirect('/')
		}
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