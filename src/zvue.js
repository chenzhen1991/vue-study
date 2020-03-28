function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    //创建一个观察者
    new Observe(obj)
}

//设置get set 方法 给每一个属性
function defienReactive(obj, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal
            }
            observe(val)
            // watchers.forEach(w=>w.update())
            dep.notify()
        }
    })
}

//为$data做代理
function proxy(vm, prop) {
    Object.keys(vm[prop]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[prop][key]
            },
            set(newVal) {
                vm[prop][key] = newVal
            }
        })
    })
}

class Zvue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        observe(this.$data)
        proxy(this, '$data')

        // 2. 编译
        new Compile(options.el, this)
    }
}

class Observe {
    constructor(value) {
        this.value = value
        this.walk(value)
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defienReactive(obj, key, obj[key])
        })
    }
}

//编译compile
class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        if (this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            
            if (this.isElement(node)) {
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                this.compileText(node)
            }
            if (node.childNodes) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType == 1
    }

    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }

    compileElement(node) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name
            let exp = attr.value
            if (this.isDireactive(attrName)) {
                let dir = attrName.split('-')[1]
                this[dir] && this[dir](node, exp)
            }
        })
    }

    isDireactive(attr) {
        return attr.indexOf('z-') == 0
    }

    text(node, exp) {
        // node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }

    html(node, exp) {
        this.update(node, exp, 'html')
    }

    update(node, exp, dir) {
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])
        
        new Watcher(this.$vm, exp, (val) => {
            fn && fn(node, val)
        })
    }

    textUpdater(node, val) {
        node.textContent = val
    }

    htmlUpdater(node, val) {
        node.innerHTML = val
    }
}

// const watchers = []
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        // watchers.push(this)
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

class Dep {
    constructor() {
        this.deps = []
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}