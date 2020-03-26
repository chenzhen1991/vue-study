function observe (obj) {
    if(typeof obj !== 'object' || obj === null){
        return
    }

    new Observe(obj)
}
function defienReactive (obj,key,val){
    Object.defineProperty(obj,key,{
        get(){
            return val
        },
        set(newVal){
            if(newVal !== val){
                val = newVal
            }
        }
    })
}
class ZVue {
    constructor(options){
        this.options = options
        this.$data = options.data

        observe(this.$data)
    }
}
class Observe {
    constructor(value){
        this.value = value
        walk(value)
    }
    walk(obj){
        Object.keys(obj).forEach(key =>{
            defienReactive(obj,key,obj[key])
        })
    }
}

export default ZVue