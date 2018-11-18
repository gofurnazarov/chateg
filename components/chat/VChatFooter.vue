<template>
	<div class="chat-footer col-auto">
		<form class="message-form">
			<div class="col-auto p-0">
				<button 
					type="button" 
					class="btn btn-primary btn-left"
					:disabled="disabled"
					@click="disconnectPartner"
				/>
			</div>
			<div class="col p-0">
				<div 
					contenteditable 
					class="textarea" 
					:placeholder="$t('Chat.TypeMessage')"
					@keyup.enter.exact="sendMessage"
					@keypress="startTyping"
					ref="textarea"
				/>
			</div>
			<div class="col-auto p-0">
				<button 
					type="button" 
					class="btn btn-info btn-right"
					:disabled="disabled"
					@click="sendMessage"
				/>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			disabled: true,
			typing: false,
			timeout: undefined
		}
	},

	methods: {
		sendMessage() {
			this.typing = false;
			this.$emit('stoptyping');
			clearTimeout(this.timeout)

			const message = this.$refs.textarea.innerText.trim();
			if(message && this.disabled == false) {
				this.$emit('send', message)			
				this.$refs.textarea.innerText = '';
			}
		},
		disconnectPartner() {
			this.$emit('disconnect')
			this.$refs.textarea.innerText = '';
		},
		disableButtons() {
			this.disabled = true;
		},
		enableButtons() {
			this.disabled = false;
		},
		startTyping() {
			if(this.typing) {
				clearTimeout(this.timeout)

				this.timeout = setTimeout(() => {
					this.typing = false;
					this.$emit('stoptyping');
				}, 5000)
			} else {
				this.$emit('starttyping');
				
				this.timeout = setTimeout(() => {
					this.typing = false;
					this.$emit('stoptyping');
				}, 5000)
			}

			this.typing = true;
		}
	},
}
</script>

<style>

</style>
