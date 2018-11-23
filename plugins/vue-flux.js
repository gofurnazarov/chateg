import Vue from 'vue';
import VueFlux from '~/vendor/vue-flux-master/src/components/VueFlux.vue';
import transitionFade from '~/vendor/vue-flux-master/src/components/transitions/fade.vue';

Vue.component('vue-flux', VueFlux);
Vue.prototype.$fluxTransitions = { transitionFade };