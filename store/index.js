import Vuex from 'vuex'
import axios from 'axios'

if (process.server) {
	var LS = {
		getItem: function() {
			return;
		},
		setItem: function () {
			return;
		},
	}
} else {
	var LS = localStorage;
}

const createStore = () => {
	return new Vuex.Store({
		state: {
			locales: ['en', 'ru', 'uz'],
			locale: LS.getItem('locale'),
			user: LS.getItem('user'),
			partnerId: LS.getItem('partnerid')
		},
		
		mutations: {
			saveUser(state, user) {
				let jsonData = JSON.stringify(user);
				state.user = jsonData 
				LS.setItem('user', jsonData);
			},
			setPartnerId(state, id) {
				state.partnerId = id;
				LS.setItem('partnerid', id);
			},
			removePartner(state) {
				state.partnerId = null;
				LS.setItem('partnerid', null);
			},
			setLanguage(state, locale) {
					state.locale = locale;
					LS.setItem('locale', locale);
			}
		},
		
		actions: {
			saveUser(storeContext, user) {
				axios.post('api/login', {
					user: user
				}).then((res) => {
					if (res.data.success) {
						storeContext.commit('saveUser', user)
						this.$router.push({ name: 'chat' })
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		
		getters: {
			getUser(state) {
				if(state.user) {
					return JSON.parse(state.user);
				} else {
					return null;
				}
			},
			getPartnerId(state) {
				return state.partnerId
			},
			getCountryId(state) {
				if (state.user) {
					let countryId = JSON.parse(state.user).country.value
					return countryId;
				} else {
					return false;
				}
			}
		}
	});
};

export default createStore;