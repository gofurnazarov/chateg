<template>
	<div class="header">
		<div class="text-center">
			<nuxt-link 
				:to="homeLink" 
				class="logo-link"
			>
				<!-- <img 
					src="/logo-64x64.png" 
					class="align-text-bottom logo-image" 
					alt="Logo"
				>  -->
				<span class="logo-text ml-1">Chateg.com</span>
			</nuxt-link>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		homeLink() {
			let homeLink = '/';

			if(this.$store.state.locale == 'ru') {
				homeLink = '/ru'
			}

			if(this.$store.state.locale == 'uz') {
				homeLink = '/uz'
			}

			return homeLink;
		}
	}
}
</script>