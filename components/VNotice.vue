<template>
	<div class="v-notice">
		<div 
			class="alert"
			:class="type"
			v-html="content"
		/>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		}
	}
}
</script>

<style>

</style>
