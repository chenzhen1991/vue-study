import { createApp } from './main';

const { router, app, store } = createApp()
// 恢复store的数据状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount("#app")
})