export default {
    prop:{
        to:String,
        default:''
    },
    //需要返回一个a标签,有href属性等
    render(h){
        console.log(this.to)
        return h('a',{attrs: {href:'#'+this.to}},[this.$slots.default])
    }
}