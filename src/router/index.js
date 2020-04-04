import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index.vue';


Vue.use(Router)

//导出工厂函数
//每个用户之间应该是独立的实例，这样才不会相互污染
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Index },
            { path: '/detail', component: { template: '<div>detail page</div>' } }
        ]
    })
}