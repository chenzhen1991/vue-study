function observe (obj){
    if(typeof obj !== 'object' || obj === null){
        return
    }

    //创建观察者
    new Observe(obj)
}

function definedReactive (obj,key,val){
    //递归遍历,如果val本身就是对象
    observe(obj)
    //创建一个DEP实例和key一一对应
    const dep = new Dep()
    Object.defineProperty(obj,key,{
        get() {
            dep.target && dep.addDep(dep.target)
            return val
        },
        set(newVal) {
            if(val !== newVal){
                observe(newVal)
                val = newVal

                //更新
                dep.notify()
            }
        }
    })
}
//代理
function proxy (vm,prop) {
    Object.keys(vm[prop]).forEach(key => {
        Object.defineProperty(vm,key,{
            get() {
                return vm[prop].key
            },
            set(newVal) {
                if(vm[prop].key !== newVal){
                    vm[prop].key = newVal
                }
            }
        })
    })
}


class ZzzVue{
    constructor(options){
        this.$options = options
        this.$data = options.data

        //观察数据
        observe(this.$data)

        //代理
        proxy(this,'$data')

        //编译
        new Compile(options.el, this)
    }
}
//观察者
class Observe {
    constructor(value){
        this.value = value
        this.walk(value)
    }

    walk(obj){
        Object.keys(obj).forEach(key => {
            definedReactive(obj,key,obj[key])
        })
    }
}

//编译器 解析模板中插件表达式或者指令
class Compile{
    //vm是vue,用于初始化和更新数据
    //el是页面传递过来的dom
    constructor(vm,el){
        this.$vm = vm
        //获取模板
        this.$el = document.querySelector(el)

        this.compile(this.$el)
    }

    compile(el){
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isElement(node)){
                console.log('节点元素',node.nodeName)
                this.compileElement(node)
            }else if(this.isInter(node)){
                console.log('节点内容',node.textContent)
                this.compileText(node)
            }

            if(node.childNodes){
                this.compile(node)
            }
        })
    }

    //判断是否是元素节点
    isElement (node) {
        return node.nodeType === 1
    }

    //判断是不是节点内容
    isInter(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.text(node.textContent)
    }

    //更新
    update(node,exp,dir){
        //检查是否存在实操函数
        const fn = this[dir+'Updater']
        fn && fn(node,this.$vm[exp])

        new Watcher(this.$vm,exp,val =>{
            fn && fn(node,val)
        })
    }

    textUpdater(node,val){
        node.textContent = val
    }

    compileText(node){
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node,RegExp.$1 , 'text')
    }

    compileElement (node) {
        const nodeAttrs = node.attributes

        Object.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name
            let exp = attr.value
            if(this.isDir(attr)){
                let dir = attrName.substring(2)
                this[dir] && this[dir](node,exp)
            }
        })
    }

    isDir(attr) {
        return attr.indexOf('k-') === 0
    }

    // k-text指令执行
    text(node, exp) {
        this.update(node, exp, 'text')
    }

    html(node, exp) {
        this.update(node, exp, 'html')
    }

    htmlUpdater(node, val) {
        node.innerHTML = val
    }
}

//Watcher: 和模板中的依赖1对1对应，如果某个key发生变化，则执行更新函数
class Watcher {
   constructor(vm,key,updater){
       this.vm = vm
       this.key = key
       this.updater = updater

       // 和Dep简单的关系
       Dep.target = this
       this.vm[this.key]  // 触发get 可以做依赖收集
       Dep.target = null
   }

   update () {
       this.updater.call(this.vm,this.vm[this.key])
   }
}

//Dep：管理watcher
class Dep {
    constructor(){
        this.watchers = []
    }

    addDep (watcher) {
        this.watchers.push(watcher)
    }

    notify(){
        this.watchers.forEach(w => {
            w.update()
        })
    }
}