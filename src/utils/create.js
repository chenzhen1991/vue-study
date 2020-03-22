import Vue from 'vue';
// function create(Component, props){
//     const vm = new Vue({
//         render (h) {
//             return h(Component, {props})
//         }
//     }).$mount()
//     document.body.appendChild(vm.$el)
//     const com = vm.$children[0]
//     com.remove = () =>{
//         document.body.removeChild(vm.$el)
//         vm.$destroy()
//     }
//     return com
// }
function create (Component, props) {
    const vm = Vue.extend({
        render (h) {
            return h(Component, {props})
        }
    })
    const ceateElement = new vm().$mount()
    document.body.appendChild(ceateElement.$el)
    const com = ceateElement.$children[0];
    com.remove = () => {
        document.body.removeChild(ceateElement.$el)
        ceateElement.$destory()
    }
    return com
}
export default create;