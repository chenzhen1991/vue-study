import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

// 通用页面 不需要守卫
export const constRoutes = [
    {
        path: '/login',
        component: () => import('../views/Login'),
        hidden:true  //导航菜单忽略该项
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName:"home" */'../views/Home.vue'),
        name: 'home',
        meta: {
            title: 'Home', //导航菜单项标题
            icon: 'qq'   //导航菜单项图标
        },
        children:[
            {
                path: '/home/homeChild',
                component: () => import(/* webpackChunkName:"home" */'../views/HomeChild.vue'),
                name: 'homeChild',
                meta: {
                    title: 'HomeChild' //导航菜单项标题
                },
            }
        ]
    }
]

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
    {
        path: '/about',
        component: () => import(/* webpackChunkName:"about" */'../views/About.vue'),
        name: 'about',
        meta: {
            title: 'About',
            icon: 'auto',
            roles: ['admin', 'editor']
        },
        children:[
            {
                path: '/home/homeChild1',
                component: () => import(/* webpackChunkName:"home" */'../views/HomeChild.vue'),
                name: 'homeChild1',
                meta: {
                    title: 'HomeChild1' //导航菜单项标题
                },
            }
        ]
    }
]

export  default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRoutes
})