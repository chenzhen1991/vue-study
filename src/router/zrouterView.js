export default {
    render(h) {
        // let component = null
        // this.$router.$options.routes.forEach(route => {
        //     if(route.path == this.$router.current){
        //         component = route.component
        //     }
        // })
        //标记当前router-view的深度
        console.log(this.$vnode.data);
        
        this.$vnode.data.routerView = true

        let depth = 0
        let parent = this.$parent
        console.log(parent)
        while(parent){
            console.log(parent.$vnode)
            const vnodeData = parent.$vnode && parent.$vnode.data
            console.log(vnodeData)
            if(vnodeData){
                if(vnodeData.routerView){
                    depth++
                }
            }
            
            parent = parent.$parent
        }

        // let { routeMap, current } = this.$router
        // const component = routeMap[current] ? routeMap[current].component : null
        let component = null
        const route = this.$router.matched[depth]
        if(route){
            component = route.component
        }
        return h(component)
    }
}