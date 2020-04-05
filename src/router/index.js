import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index.vue';

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Index },
            { path: '/detail', component: { template: '<div>detail page</div>' } },
        ]
    })
}