import Vue from 'vue'
import Router from 'vue-router'

import Index from '~/pages/Home'
import Login from '~/pages/Login'
import Chat from '~/pages/Chat'
import ChatRules from '~/pages/ChatRules'

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{
				name: 'index',
				path: '/',
				component: Index,
				alias: [
					'/en',
					'/ru',
					'/uz'
				]
			},
			{
				name: 'login',
				path: '/:lang?/login',
				component: Login,
			},
			{
				name: 'chat',
				path: '/:lang?/chat',
				component: Chat,
			},
			{
				name: 'chat-rules',
				path: '/chat-rules',
				component: ChatRules,
			}
		]
	})
}