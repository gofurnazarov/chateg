import Vuex from 'vuex'
import axios from 'axios'
import JSCookie from 'js-cookie'
import Cookie from 'cookie'

const createStore = () => {
	return new Vuex.Store({
		state: {
			locales: ['en', 'ru', 'uz'],
			locale: JSCookie.get('locale'),
			user: JSCookie.get('user'),
			partnerId: JSCookie.get('partnerId')
		},

		mutations: {
			saveUser(state, user) {
				state.user = user;
				JSCookie.set('user', user, { expires: 7 })
			},
			setPartnerId(state, id) {
				state.partnerId = id;
				JSCookie.set('partnerId', id)
			},
			removePartner(state) {
				state.partnerId = null;
				JSCookie.remove('partnerId')
			},
			setLanguage(state, locale) {
				state.locale = locale;
				JSCookie.set('locale', locale, { expires: 7 })
			}
		},
		
		actions: {
			nuxtServerInit({ commit }, { req }) {
				const theCookie = Cookie.parse(req.headers.cookie || '')
				
				if (theCookie.hasOwnProperty('user')) {
					commit('saveUser', theCookie.user)
				}

				if (theCookie.hasOwnProperty('locale')) {
					commit('setLanguage', theCookie.locale)
				}
			},
			saveUser(storeContext, user) {
				// axios.post(process.env.baseUrl + '/api/login', {
				// 	user: user
				// }).then((res) => {
				// 	if (res.data.success) {
				// 		storeContext.commit('saveUser', user)
						
				// 		const url = process.env.baseUrl + '/' + storeContext.state.locale + '/chat';
				// 		window.location.replace(url)
				// 	}
				// }).catch((err) => {
				// 	console.log(err)
				// })

				storeContext.commit('saveUser', user)
				const url = process.env.baseUrl + '/' + storeContext.state.locale + '/chat';
				window.location.replace(url)
			}
		},
		
		getters: {
			getUser(state) {
				if (state.user) {
					if(typeof(state.user) == 'object') {
						return state.user;
					} else {
						return JSON.parse(state.user);
					}
				}
				
				return state.user;
			},
			getCountryId(state) {
				if (state.user) {
					if (typeof(state.user) == 'object') {
						return state.user.country.value;
					} else {
						return JSON.parse(state.user).country.value;
					}
				} 

				return null;
			},
			getCountryNativeName(state) {
				if (state.user) {
					if (typeof(state.user) == 'object') {
						return state.user.country.label;
					} else {
						return JSON.parse(state.user).country.label;
					}
				}

				return null;
			}
		}
	});
};

export default createStore;