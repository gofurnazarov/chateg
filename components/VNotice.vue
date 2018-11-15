<template>
	<div class="flash text-center">
		<div 
			class="flash__message" 
			:class="type"
		>
			<div 
				class="flash__message-content" 
				v-html="content"
			/>
		</div>
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
