import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router';
import { createStore } from './store';

Vue.config.productionTip = false

export function createApp(context) {
  //创建路由实例
  const router = createRouter()
  const store = createStore()
  //创建vue实例
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App),
  }).$mount('#app')

  return { app, router, store }
}
