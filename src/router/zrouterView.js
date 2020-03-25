export default {
    render (h) {
        let component = null
        console.log(this.$router.$options)
        this.$router.$options.routes.forEach(route => {
            if(route.path == this.$router.current){
                component = route.component
            }
        })
        return h(component)
    }
}