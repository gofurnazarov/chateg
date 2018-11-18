<template>
	<div class="chat-header col-auto">
		<div>
			<span class="text-truncate">{{ countryNativeName }} </span>
			<span class="badge badge-light ml-1"><img src="/boy-24.png"> {{ males }}</span>
			<span class="badge badge-light ml-1"><img src="/girl-24.png"> {{ females }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			countryId: '',
			males: 0,
			females: 0,
		}
	},

	computed: {
		countryNativeName() {
			return this.$store.getters.getCountryNativeName;
		}
	},

	mounted() {
		let countryId = this.$store.getters.getCountryId;

		if(countryId) {
			this.$axios.get('api/get_males_and_females', {
				params: {
					countryId: countryId
				}
			}).then((result) => {
				this.males = result.data.males;
				this.females = result.data.females;
			})
			
			setInterval(() => {
				this.$axios.get('api/get_males_and_females', {
					params: {
						countryId: countryId
					}
				}).then((result) => {
					this.males = result.data.males;
					this.females = result.data.females;
				})
			}, 15000)
		}
	},
}
</script>