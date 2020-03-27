export default {
    render (h) {
        let component = null
        // this.$router.$options.routes.forEach(route => {
        //     if(route.path == this.$router.current){
        //         component = route.component
        //     }
        // })
        console.log('view',this.$router)
        let {routeMap , current} = this.$router
        console.log(routeMap , current)
        component = routeMap[current] ? routeMap[current].component : null
        return h(component)
    }
}