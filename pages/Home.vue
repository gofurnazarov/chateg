<template>
	<div class="row flex-column h-100 m-0">
		<div class="col-auto p-0">
			<v-header/>
		</div>
		<div class="col p-0">
			<div class="home-page-content">
				<no-ssr>
					<vue-flux
						:options="fluxOptions"
						:images="fluxImages"
						:transitions="fluxTransitions"
						ref="slider"
					/>
				</no-ssr>

				<div class="text-group">
					<h1>{{ $t('Home.Introduction') }}</h1>
					<h4>{{ $t('Home.SubIntroduction') }}</h4>

					<nuxt-link 
						:to="loginLink" 
						class="btn btn-primary"
					>
						{{ $t('Home.EnterChat') }}
					</nuxt-link>

					<div class="online-now">
						<h5 class="mb-1">{{ $t('Home.OnlineUsers') }}</h5>
						<span>
							{{ $t('Home.All') + onlineUsers }} |
							{{ countryName + ': ' + onlineUsersFrom }}
						</span>
					</div>
				</div>
				<div class="languages">
					<nuxt-link
						to="/en" 
						class="language"
					>English</nuxt-link>
					<nuxt-link
						to="/ru" 
						class="language"
					>Русский</nuxt-link>
					<nuxt-link
						to="/uz" 
						class="language"
					>O'zbekcha</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VHeader from '~/components/VHeader'
import VLoading from '~/components/VLoading'

export default {
	name: 'Home',

	head () {
		return {
			title: this.$t('Home.Title'),
			meta: [
				{ rel:'alternate', hreflang:'ru', href:'http://localhost:1010/ru' },
				{ rel:'alternate', hreflang:'uz', href:'http://localhost:1010/uz' },
				{ rel:'alternate', hreflang:'x-default', href:'http://localhost:1010' },
				{ hid: 'description', name: 'description', content: this.$t('Home.Description') },
				{ hid: 'keywords', name: 'keywords', content: this.$t('Home.Keywords') }
			],
		}
	},
	
	async asyncData (context) {
		let result = await context.app.$axios.get('api/get_users');

		return {
			onlineUsers: result.data.onlineUsers,
		}
	},
		
	data() {
		return {
			onlineUsers: 0,
			onlineUsersFrom: 0,
			countryId: null,
			countryName: '- - -',
			countryNativeName: null,
			fluxOptions: {
        autoplay: true
      },
      fluxImages: [ '/background1-min.jpg', '/background2-min.png', '/background3-min.jpg' ],
      fluxTransitions: {
				transitionBook: null
      }
		}
	},

	computed: {
		loginLink() {
			const locale = this.$store.state.locale;

			if(locale != 'en') {
				return locale + '/login'
			} else {
				return 'login'
			}
		}
	},

	methods: {
		async getUserCountryId() {
			let result = await this.$axios.get('http://ip-api.com/json');
			return result.data.countryCode;
		},
		async countUsersFromCountry(countryId) {
			let result = await this.$axios.get('api/get_users_from_country', {
				params: {
					countryId: countryId
				}
			});

			this.onlineUsersFrom = result.data.onlineUsers;
		},
		async getCountryNativeName(id) {
			let result = await this.$axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);

			this.countryName = result.data.nativeName;
		},
		changeLanguage(lang) {
			this.$store.commit('setLanguage', lang)
			window.location.reload(true)
		}
	},

	async created() {
		this.getUserCountryId().then((countryId) => {
			this.countUsersFromCountry(countryId)
			this.getCountryNativeName(countryId)
		})
	},

	beforeMount() {
		this.fluxTransitions.transitionBook = this.$fluxTransitions.transitionFade;
	},
	
	components: {
		VHeader,
		VLoading
	}
};
</script>