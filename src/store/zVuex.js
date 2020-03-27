let Vue

class Store {
    constructor(options ={}) {
        //只要放在data上,即成为响应式数据
        this._vm = new Vue({
            data:{
                $$state: options.state
            }
        })
        this._mutations = options.mutations
        this._actions = options.actions

        //绑定commit/dispatch方法中的this到store实例上
        const store = this
        const {commit,dispatch} = store
        this.commit = function boundCommit(type,payload) {
            commit.call(store,type,payload)
        }
        this.dispatch = function boundDispatch(type,payload) {
            dispatch.call(store,type,payload)
        }
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.log('不推从')
    }

    commit (type,payload) {
        const entry = this._mutations[type]
        console.log(entry)
        if(!entry){
            return
        }
        //传递state进去
        entry(this.state,payload)
    }

    dispatch (type,payload) {
        const entry = this._actions[type]
        if(!entry){
            return
        }
        //传递上下文进去,实际上就是store实例
        entry(this,payload)
    }
}

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store, install}