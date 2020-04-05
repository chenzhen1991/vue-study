import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router';
// import { createStore } from './store';

Vue.config.productionTip = false

export function createApp(context) {
  //创建路由实例
  const router = createRouter()
  // const store = createStore()
  console.log(123, router);

  //创建vue实例
  const app = new Vue({
    router,
    context,
    render: h => h(App),
  })

  return { app, router }
}
