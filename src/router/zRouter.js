import Link from './zrouterLink'
import View from './zrouterView';
let Vue; //引入构造函数,后面方便VueRouter中引用
class VueRouter {
    constructor(options){
        this.$options = options

        //缓存route和path的映射关系
        // this.routeMap = {}
        // this.$options.routes.forEach((route)=>{
        //     this.routeMap[route.path] = route
        // })

        //current是响应式的
        // Vue.util.defineReactive(this,current,'/')
        //定义响应式属性current
        // const initial = window.location.hash.slice(1) || '/'
        // Vue.util.defineReactive(this,'current',initial)

        //路由多级嵌套
        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this,'matched',[])

        //match可以递归遍历路由表
        this.match()

        //监听
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))
    }
    onHashChange () {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }

    match (routes) {
        routes = routes || this.$options.routes

        //递归遍历
        for (const route of routes) {
            if(route.path === '/' || this.current === '/'){
                this.matched.push(route)
                return
            }
            
            // 假设 /about/info
            if(route.path != '/' && this.current.indexOf(route.path) != -1){
                this.matched.push(route)
                if(route.children){
                    this.match(route.children)
                }
                return
            }
            
        }
    }
}
//插件 引入install方法,注册$router
VueRouter.install = function (_Vue) {
    Vue = _Vue
    //第一步挂载$router
    Vue.mixin({
        beforeCreate(){
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    //第二步 实现两个全局组件
    Vue.component('router-link', Link)
    Vue.component('router-view', View)
}
export default VueRouter