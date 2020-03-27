export default {
    render (h) {
        // let component = null
        // this.$router.$options.routes.forEach(route => {
        //     if(route.path == this.$router.current){
        //         component = route.component
        //     }
        // })
        let {routeMap , current} = this.$router
        const component = routeMap[current] ? routeMap[current].component : null
        return h(component)
    }
}