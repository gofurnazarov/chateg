<template>
	<div class="h-100">
		<v-header class="position-absolute w-100"/>
		<div class="container-fluid h-100">	
			<div class="row justify-content-center h-100 align-content-start">
				<div class="col-lg-7 col-md-12 h-100 p-0">		
					<div class="chat d-flex flex-column">
						<v-chat-header/>
						<v-chat-content
							ref="chatContent"
						/>
						<v-chat-footer
							@send="sendMessage"
							@disconnect="disconnectPartner"
							@starttyping="onStartTyping"
							@stoptyping="onStoptTyping"
							ref="chatFooter"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import VHeader from '~/components/VHeader'
import VChatHeader from '~/components/chat/VChatHeader'
import VChatContent from '~/components/chat/VChatContent'
import VChatFooter from '~/components/chat/VChatFooter'
import socket from '~/plugins/socket.io.js'

export default {
	name: 'Chat',
	
	head () {
		return {
				title: this.$t('Chat.Title'),
				meta: [
					{ rel:'alternate', hreflang:'ru', href:'http://localhost:1010/ru/chat' },
					{ rel:'alternate', hreflang:'uz', href:'http://localhost:1010/uz/chat' },
					{ rel:'alternate', hreflang:'x-default', href:'http://localhost:1010/chat' },
					{ hid: 'description', name: 'description', content: this.$t('Chat.Description') },
					{ hid: 'keywords', name: 'keywords', content: this.$t('Chat.Keywords') }
				]
			}
	},

	data() {
		return {
			disconnectButton: true,
			sendButton: true,
			disconnectedScreen: false
		}
	},

	methods: {
		sendMessage(message) {
			const id = this.$store.getters.getPartnerId;
			const sex = this.$store.getters.getUser.sex;

			this.$refs.chatContent.onSendMessage({ message, sex });
			socket.emit('send-message', { id, message, sex });
		},
		disconnectPartner() {
			this.$refs.chatContent.onDisconnect(socket);
			this.$refs.chatFooter.changeButtonsStatus(true);
			socket.emit('disconnect-partner', this.$store.getters.getPartnerId)
			this.$store.commit('removePartner')
		},
		onStartTyping() {
			const id = this.$store.getters.getPartnerId;
			const sex = this.$store.getters.getUser.sex;

			socket.emit('user-started-typing', { id, sex })
		},
		onStoptTyping() {
			const id = this.$store.getters.getPartnerId;

			socket.emit('user-stopped-typing', id)
		}
	},

	mounted() {
		socket.connect()

		socket.emit('enter-chat', this.$store.getters.getUser)

		socket.on('searching-partner', (id) => {
			this.$refs.chatContent.onSearchingPartner();
		})

		socket.on('partner-found', (id) => {
			this.$refs.chatContent.onPartnerFound();
			this.$refs.chatFooter.changeButtonsStatus(false);
			this.$store.commit('setPartnerId', id)
		})

		socket.on('partner-zero', () => {
			this.$refs.chatContent.onPartnerZero(socket);
			this.$refs.chatFooter.changeButtonsStatus(true);
		})
		
		socket.on('user-started-typing', (sex) => {
			this.$refs.chatContent.showTypingIndicator(sex);			
		})

		socket.on('user-stopped-typing', () => {
			this.$refs.chatContent.hideTypingIndicator();			
		})

		socket.on('new-message', ({message, sex}) => {
			this.$refs.chatContent.removeTypingIndicator();			
			this.$refs.chatContent.onNewMessage({message, sex});			
		})

		socket.on('partner-disconnected', () => {
			this.$refs.chatContent.onDisconnect(socket);
			this.$refs.chatFooter.changeButtonsStatus(true);
			this.$store.commit('removePartner')			
		})
	},

	components: {
		VHeader,
		VChatHeader,
		VChatContent,
		VChatFooter
	}
}

</script>

<style>

</style>
