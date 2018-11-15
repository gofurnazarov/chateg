<template>
	<div 
		class="message mb-2" 
		:class="{ 'flex-row-reverse': rtl }" 
		:id="id"
	>
		<div class="col-lg-6 col-md-8 col-sm-9 col-xs-10">
			<div 
				class="d-flex align-items-end" 
				:class="{ 'flex-row-reverse': rtl }"
			>
				<div class="col-auto p-0">
					<img 
						:src="`/${user}-32.png`" 
						class="messgae-icon"
					>
				</div>
				<div 
					class="col-auto px-1" 
					style="max-width: 85%"
				>
					<div 
						v-if="typing"
						class="message-text" 
					>
						<span class="circle circle-1"/>
						<span class="circle circle-2"/>
						<span class="circle circle-3"/>
					</div>
					<div 
						v-else
						class="message-text" 
					>{{ message }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: null
		}
	},

	computed: {
		id() {
			if(this.$props.typing) {
				return 'typing'
			} else {
				return false
			}
		}
	},

	created() {
		this.$props.sex == 'male'? this.user = 'boy' : this.user = 'girl'
	},

	props: {
		rtl: {
			type: Boolean,
			required: true
		},
		sex: {
			type: String,
			required: true
		},
		message: {
			type: String,
			default: ''
		},
		typing: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style>

</style>
