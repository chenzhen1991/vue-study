let Vue;

class Store {
    constructor(options = {}) {
        console.log(options.state)
        this._mutation = options.mutations || {}
        this._action = options.actions || {}
        this._wrappedGetters = options.getters
        console.log(this._wrappedGetters)

        const computed = {}
        this.getters = {}
        const store = this
        Object.keys(this._wrappedGetters).forEach(key => {
            const fn = store._wrappedGetters[key]
            computed[key] = function () {
                return fn(store.state)
            }

            //weigetters定义为只读属性
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
            })
        })



        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        })

        // 绑定commit上下⽂否则action中调⽤commit时可能出问题!!
        // 同时也把action绑了，因为action可以互调
        const { commit, action } = store
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload)
        }
        this.action = function boundCommit(type, payload) {
            return action.call(store, type, payload)
        }
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.log('不能设置值,不推荐这样')
    }

    commit(type, payload) {
        console.log('type', type)
        //获取type对应的mutation
        const entry = this._mutation[type]
        console.log(entry)
        if (!entry) {
            return
        }
        // 指定上下文,传递state给mutation
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._action[type]
        if (!entry) {
            return
        }
        //异步处理结果 尝尝需要返回promise
        return entry(this, payload)
    }
}

function install(_Vue) {
    Vue = _Vue
    //混入,在组件实例创建前将传递过来的store,挂载到vue的原型链上
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }