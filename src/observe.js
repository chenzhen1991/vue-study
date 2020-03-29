//数组响应式
const orignalProto = Array.prototype
//备份一份修改备份
const arrayProto = Object.create(orignalProto);

// console.log(arrayProto)
const arrMethods = ['push', 'pop', 'shift', 'unshift']

// eslint-disable-next-line no-unexpected-multiline
arrMethods.forEach(method => {
    console.log(method)
    arrayProto[method] = function () {
        orignalProto[method].apply(this, arguments)
        console.log('数组执行方法', method, arguments);

    }
})

function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    if (Array.isArray(obj)) {
        obj.__proto__ = arrayProto
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            observe(keys[i])
        }
    } else {
        Object.keys(obj).forEach((key) => {
            defineReactive(obj, key, obj[key])
        })
    }
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

function set(obj, key, val) {
    console.log('set')
    defineReactive(obj, key, val)
}

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, awe: [1, 2, 3, 4] }
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
set(obj, 'dong', 'zzz')
obj.dong

obj.awe.push(5)
obj.awe