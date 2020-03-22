import Vue from 'vue'
import App from './App.vue'
import create from './utils/create';
console.dir(create);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
