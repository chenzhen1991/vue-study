function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log(`set ${key}:${newVal}`);
                val = newVal
            }
        }
    })
}

function set (obj, key,val){
    console.log('set')
    defineReactive(obj, key,val)
}

const obj = {foo:'foo',bar:'bar',baz:{a:1}}
observe(obj)
obj.foo
obj.foo = 'foooooooooooo'
obj.bar
obj.bar = 'barrrrrrrrrrr'
obj.baz.a = 10 // 嵌套对象no ok

//新增加属性
obj.dong = 'dong'
obj.dong // 并没有get信息

//调用set方法
set(obj,'dong','zzz')
obj.dong 