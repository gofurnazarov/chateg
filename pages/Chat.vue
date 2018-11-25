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

export default {
	name: 'Chat',
	
	head () {
		return {
				title: this.$t('Chat.Title'),
				meta: [
					{ rel:'alternate', hreflang:'ru', href:'http://chateg.com:1010/ru/chat' },
					{ rel:'alternate', hreflang:'uz', href:'http://chateg.com:1010/uz/chat' },
					{ rel:'alternate', hreflang:'x-default', href:'http://chateg.com:1010/chat' },
					{ hid: 'description', name: 'description', content: this.$t('Chat.Description') },
					{ hid: 'keywords', name: 'keywords', content: this.$t('Chat.Keywords') }
				]
			}
	},

	middleware: 'authenticated',

	data() {
		return {
			disconnectButton: true,
			sendButton: true,
			disconnectedScreen: false,
			connectionChecker: undefined
		}
	},

	methods: {
		sendMessage(message) {
			const id = this.$store.state.partnerId;
			const sex = this.$store.getters.getUser.sex;

			this.$refs.chatContent.onSendMessage({ message, sex });
			this.$socket.emit('send-message', { id, message, sex });
		},
		disconnectPartner() {
			this.$refs.chatContent.onDisconnect(this.$socket);
			this.$refs.chatFooter.disableButtons();
			this.$socket.emit('disconnect-partner', this.$store.state.partnerId)
			this.$store.commit('removePartner')
		},
		onStartTyping() {
			const id = this.$store.state.partnerId;
			const sex = this.$store.getters.getUser.sex;
			this.$socket.emit('user-started-typing', { id, sex })
		},
		onStoptTyping() {
			const id = this.$store.state.partnerId;

			this.$socket.emit('user-stopped-typing', id)
		},
		checkConnection() {
			this.$axios.$get('/api/connection_status').then().catch(e => {
				clearInterval(this.connectionChecker);
				this.$store.commit('removePartner');
				this.$refs.chatContent.onDisconnect(this.$socket);
			});
		}
	},

	mounted() {
		const user = this.$store.getters.getUser;

		this.$socket.connect()

		this.$socket.emit('enter-chat', user)

		this.$socket.on('searching-partner', () => {
			this.$refs.chatContent.onSearchingPartner();
		})

		this.$socket.on('partner-found', (id) => {
			this.$refs.chatContent.onPartnerFound();
			this.$refs.chatFooter.enableButtons();
			this.$store.commit('setPartnerId', id)
		})

		this.$socket.on('partner-zero', () => {
			this.$refs.chatContent.onPartnerZero(this.$socket);
			this.$refs.chatFooter.disableButtons();
		})
		
		this.$socket.on('user-started-typing', (sex) => {
			this.$refs.chatContent.showTypingIndicator(sex);			
		})

		this.$socket.on('user-stopped-typing', () => {
			this.$refs.chatContent.hideTypingIndicator();			
		})

		this.$socket.on('new-message', ({message, sex}) => {
			this.$refs.chatContent.removeTypingIndicator();			
			this.$refs.chatContent.onNewMessage({message, sex});			
		})

		this.$socket.on('partner-disconnected', () => {
			this.$refs.chatContent.onDisconnect(this.$socket);
			this.$refs.chatFooter.disableButtons();
			this.$store.commit('removePartner')			
		})

		this.connectionChecker = setInterval(() => {
			this.checkConnection();
		}, 10000)


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
