import Vue from 'vue';
import App from './App.vue';
// import create from './utils/create';
import './plugins/element.js';
import router from './router';
import store from './store';
import '@/icon';

Vue.config.productionTip = false;
// Vue.prototype.$create = create
console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
