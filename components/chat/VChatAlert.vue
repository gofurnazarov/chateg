<template>
	<div 
		class="text-center"
	>
		<hr 
			v-if="sperator"
			class="mx-3" 
		>
		<v-notice
			:type="alertType"
			:content="alertText"
		/>
		<button 
			type="button" 
			class="btn btn-info mt-3 mb-2 d-block mx-auto"
			@click="findPartner"
		>
			{{ btnText }}
		</button>

		<div class="social-networks pt-3">
			<p>Like | Share | Follow</p>
			<a 
				href="https://www.facebook.com/chategcom" 
				target="_blank"
				class="mx-2"
			>
				<img src="/facebook.png">
			</a>
			<a 
				href="https://twitter.com/chategcom" 
				target="_blank"
				class="mx-2"
			>
				<img src="/twitter.png">
			</a>
			<a 
				href="https://www.instagram.com/chategcom" 
				target="_blank"
				class="mx-2"
			>
				<img src="/instagram.png">
			</a>
			<a 
				href="https://vk.com/chategdotcom" 
				target="_blank"
				class="mx-2"
			>
				<img src="/vk.png">
			</a>
		</div>
	</div>
</template>

<script>
import PCheck from 'pretty-checkbox-vue/check'
import VNotice from '~/components/VNotice'

export default {
	methods: {
		findPartner() {
			const user = this.$props.store.getters.getUser;

			this.$props.socket.emit('find-partner', user)
			this.$nuxt.$emit('clear-messages'); 
		}
	},

	components: {
		VNotice
	},

	props: {
		store: {
			type: Object,
			required: true
		},
		socket: {
			type: Object,
			required: true
		},
		alertType: {
			type: String,
			required: true
		},
		alertText: {
			type: String,
			required: true
		},
		btnText: {
			type: String,
			required: true
		},
		sperator: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style>

</style>
