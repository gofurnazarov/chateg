import Vue from 'vue';
import { VueFlux, Transitions } from 'vue-flux';

Vue.component('vue-flux', VueFlux);
Vue.prototype.$fluxTransitions = Transitions;
Vue.prototype.$socket = {
	emit: function() {
		return;
	},
	on: function () {
		return;
	}
};
