import Vue from 'vue'
import App from './App.vue'
import create from './utils/create';
console.dir(create);
import '@/icon';

Vue.config.productionTip = false
Vue.prototype.$create = create
console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)
new Vue({
  render: h => h(App),
}).$mount('#app')
