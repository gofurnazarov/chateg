<template>
	<div>
		<v-header/>
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-lg-5 col-md-8">
					<form 
						class="login-form shadow-sm"
						@submit.prevent="handleSubmit"
					>
						<v-form-group
							has-image
							:label-text="$t('Login.Sex')"
							has-bottom-line
							content-class="d-flex justify-content-around"
						>
							<div class="col-auto">
								<p-radio 
									class="p-default p-round p-pulse" 
									color="danger" 
									name="sex" 
									value="male"
									v-model="user.sex"
								>
									<img src="/boy.png">
								</p-radio>
							</div>
							<div class="col-auto">
								<p-radio 
									class="p-default p-round p-pulse" 
									color="danger" 
									name="sex"
									value="female"
									v-model="user.sex"
								>
									<img src="/girl.png">
								</p-radio>
							</div>
						</v-form-group>
						<v-form-group
							has-image
							:label-text="$t('Login.Partner')"
							has-bottom-line
							content-class="d-flex justify-content-around"
						>
							<div class="col-auto">
								<p-check 
									class="p-default p-curve p-pulse" 
									color="danger"
									value="male"
									v-model="user.partner"
									@change="onMale"
								>
									<img src="/boy.png">
								</p-check>
							</div>
							<div class="col-auto">
								<p-check 
									class="p-default p-curve p-pulse" 
									color="danger"
									value="female"
									v-model="user.partner"
									@change="onFemale"
								>
									<img src="/girl.png">
								</p-check>
							</div>
						</v-form-group>
						<div class="form-group google-captcha">
							<!-- <vue-recaptcha 
								ref="recaptcha"
								type="invisible"
								sitekey="6Ld4RnQUAAAAAHMYhe_oY-6GMnh6F7nbsevkqpRv"
								@verify="onVerify"
								@expired="onExpired"
							>
								<button class="d-none">recaptcha</button>
							</vue-recaptcha> -->
						</div>
						<v-form-group
							:label-text="$t('Login.Country')"
						>
							<no-ssr>
								<vue-select
									:class="['mb-5', {'has-error': countryEmpty}]"
									v-model="user.country"
									:options="countries"
									max-height="200px"
									:clearable="false"
								/>
								<template slot="placeholder">
									<small class="d-block text-center mb-2">Loading . . .</small>
								</template>
							</no-ssr>
						</v-form-group>
						
						<div class="form-group">
							<small 
								class="d-block text-center"
								v-html="$t('Login.Rules')"
							/>
						</div>

						<div class="form-group google-captcha">
							<button class="btn btn-primary d-block mx-auto mb-3 font-weight-bold text-uppercase px-5 py-3 mt-3">
								{{ $t('Login.EnterChat') }}
							</button>
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PCheck from 'pretty-checkbox-vue/check'
import PRadio from 'pretty-checkbox-vue/radio'
import VHeader from '~/components/VHeader'
import VFormGroup from '~/components/VFormGroup'
// import VueRecaptcha from 'vue-recaptcha'

export default {
	name: 'Login',

	head () {
		return {
			title: this.$t('Login.Title'),
			meta: [
				{ rel:'alternate', hreflang:'ru', href:'http://chateg.com:1010/ru/login' },
				{ rel:'alternate', hreflang:'uz', href:'http://chateg.com:1010/uz/login' },
				{ rel:'alternate', hreflang:'x-default', href:'http://chateg.com:1010/login' },
				{ hid: 'description', name: 'description', content: this.$t('Login.Description') },
				{ hid: 'keywords', name: 'keywords', content: this.$t('Login.Keywords') }
			],
			// script: [
			// 	{ src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit' }
			// ]
		}
	},
	
	data () {
		return {
			countries: [],
			countryEmpty: false,
			maleSelected: false,
			femaleSelected: true,
			user: {
				sex: 'male',
				partner: ['female'],
				country: null,
				token: null
			}
		}
	},

	methods: {
		onMale(val) {
			if(val.length == 0) {
				this.user.partner.push('female')
			}
		},
		onFemale(val) {
			if(val.length == 0) {
				this.user.partner.push('male')
			}
		},
		handleSubmit() {
			if(this.user.country == null) {
				this.countryEmpty = true;
			} else {
				this.$refs.recaptcha.execute()
			}
		},
		onVerify(token) {
			this.$refs.recaptcha.reset();
			
			if(this.user.country == null) {
				this.countryEmpty = true;
			} else {
				this.user.token = token;

				this.$store.dispatch('saveUser', this.user)
			}
		},
		onExpired() {
			this.$refs.recaptcha.reset();
		}
	},

	async beforeMount() {
		let countries = await this.$axios.$get(`https://restcountries.eu/rest/v2/all`)

		try {
			if(countries) {
				countries.forEach(element => {
					this.countries.push({ label: element.nativeName, value: element.alpha2Code });
				});
			}
		} catch(e) {
			console.log(e)
		}

		let result = await this.$axios.$get('http://ip-api.com/json');
		let countryId = result.countryCode;
		let result1 = await this.$axios.$get(`https://restcountries.eu/rest/v2/alpha/${countryId}`);
		let nativeName = result1.nativeName;
		this.user.country = { label: nativeName, value: countryId };
	},


	watch: {
		'user.sex'(newVal, oldVal) {
			if(newVal == 'female') {
				this.user.partner = ['male']
			} else {
				this.user.partner = ['female']
			}
		},
		'user.country'(newVal, oldVal) {
			if(newVal) {
				this.countryEmpty = false;
			} 
		}
	},

	components: {
		VHeader,
		VFormGroup,
		// VueRecaptcha,
		PCheck,
		PRadio
	}
}
</script>
