<template>
	<div 
		class="chat-content col" 
		ref="content"
	/>
</template>

<script>
import Vue from 'vue'
import VNotice from '~/components/VNotice'
import VMessage from '~/components/VMessage'
import VLoading from '~/components/VLoading'
import VChatAlert from '~/components/chat/VChatAlert'
import PCheck from 'pretty-checkbox-vue/check'

export default {
	methods: {
		clearMessages() {
			this.$refs.content.innerHTML = '';
		},
		onSearchingPartner() {
			this.clearMessages();

			const itemClass = Vue.extend(VLoading)
			const itemInstance = new itemClass()
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
		}, 
		onPartnerFound() {
			this.clearMessages();

			const itemClass = Vue.extend(VNotice)
			const itemInstance = new itemClass({
					propsData: { 
						type: 'success',
						content: this.$t('Chat.YouAreConnected')
					}
			})
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
		},
		showTypingIndicator(sex) {
			let indicator = document.getElementById('typing')

			if(indicator) {
				indicator.classList.remove('d-none');
			} else {
				const itemClass = Vue.extend(VMessage)
				const itemInstance = new itemClass({
						propsData: { 
							rtl: false,
							sex: sex,
							typing: true
						}
				})
				itemInstance.$mount()
				this.$refs.content.appendChild(itemInstance.$el)
				this.scrollToBottom();
			}
		},
		hideTypingIndicator() {
			let indicator = document.getElementById('typing')

			if(indicator) {
				indicator.classList.add('d-none');
			} 
		},
		removeTypingIndicator() {
			let indicator = document.getElementById('typing');

			if(indicator) {
				indicator.parentNode.removeChild(indicator);
			}
		},
		onNewMessage({message, sex}) {
			const itemClass = Vue.extend(VMessage)
			const itemInstance = new itemClass({
					propsData: { 
						rtl: false,
						sex: sex,
						message: message
					}
			})
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
			this.scrollToBottom();
		},
		onSendMessage({ message, sex }) {
			const itemClass = Vue.extend(VMessage)
			const itemInstance = new itemClass({
					propsData: { 
						rtl: true,
						sex: sex,
						message: message
					}
			})
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
			this.scrollToBottom();
		},
		onPartnerZero(socket) {
			this.clearMessages();

			const store = this.$store;
			const itemClass = Vue.extend(VChatAlert)
			const itemInstance = new itemClass({
					propsData: { 
						store: store,
						socket: socket,
						alertType: 'error',
						alertText: this.$t('Chat.PartnerNotFound'),
						btnText: this.$t('Chat.SearchAgain'),
						sperator: false
					}
			})
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
		},
		onDisconnect(socket) {
			const store = this.$store;
			const itemClass = Vue.extend(VChatAlert)
			const itemInstance = new itemClass({
					propsData: { 
						store: store,
						socket: socket,
						alertType: 'error',
						alertText: this.$t('Chat.YouAreDisconnected'),
						btnText: this.$t('Chat.ConnectToAnotherStranger'),
						sperator: true
					}
			})
			itemInstance.$mount()
			this.$refs.content.appendChild(itemInstance.$el)
			this.scrollToBottom();
		},
		scrollToBottom() {
			this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
		}
	},

	mounted() {
		this.$nuxt.$on('clear-messages', () => {
			this.clearMessages();
		});
	},
}
</script>

