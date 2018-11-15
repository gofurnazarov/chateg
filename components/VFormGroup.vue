<template>
	<div 
		class="form-group" 
		:class="{'pretty-with-image': hasImage }"
	>
		<label 
			class="d-block" 
			:class="[labelClass]"
		> {{ labelText }} </label>
		<div :class="[contentClass]">
			<slot/>
		</div>
		<hr v-if="hasBottomLine">
	</div>
</template>

<script>
export default {
	props: {
		hasImage: {
			type: Boolean,
			default: false,
		},
		labelClass: {
			type: String,
			default: 'font-weight-bold pt-3 mb-3'
		},
		labelText: {
			type: String,
			default: ''
		},
		contentClass: {
			type: String,
			default: null
		},
		hasBottomLine: {
			type: Boolean,
			default: false
		}
	}
}
</script>
