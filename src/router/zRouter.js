import Link from './zrouterLink'
import View from './zrouterView';
let Vue; //引入构造函数,后面方便VueRouter中引用
class VueRouter {
    constructor(options){
        this.options = options
        //current是响应式的
        // Vue.util.defineReactive(this,current,'/')

        //定义响应式属性current
        const initial = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this,'current',initial)

        //监听
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))
    }
    onHashChange () {
        console.log(1,window.location.hash)
        this.current = window.location.hash.slice(1)
    }
}
//插件 引入install方法,注册$router
VueRouter.install = function (_Vue) {
    Vue = _Vue
    //第一步挂载$router
    Vue.mixin({
        beforeCreate(){
            console.log(this.$options.router)
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    //第二步 实现两个全局组件
    Vue.component('router-link',Link)
    Vue.component('router-view',View)
}
export default VueRouter