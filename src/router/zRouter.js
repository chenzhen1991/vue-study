import Link from './zrouterLink'
import View from './zrouterView';

let Vue; //引入构造函数,后面方便VueRouter中引用
class ZVueRouter {
    constructor(options){
        this.$options = options

        Vue.util.defineReactive(this,'current','/')

        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))

        // 对路由数组做预处理：转换为map
        this.routeMap = {}
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route
        });
    }

    onHashChange(){
        this.current = window.location.hash.slice(1)
    }
}

ZVueRouter.install =  function(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link', Link)
    Vue.component('router-view', View)
}
export default ZVueRouter