import Vue from 'vue';

function create (Component,props){
    const vm = new Vue({
        render(h){
            return h(Component, {props})
        }
    }).$mount()
    document.body.appendChild(vm.$el)
    const com = vm.$children[0]
    com.move = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return com
}
export default create;