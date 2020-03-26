<template>
  <div>
    <button @click="handle">点我点我</button>
    <div>{{add}}</div>
    <p>{{$attrs.refresh}}</p>
<!--    <p>{{pro}}</p>-->
    <div>
      插槽
      <slot></slot>
      <slot name='nameSlot'></slot>
      <slot name='name1' :foo='foo'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:'HelloWorld',
    data() {
      return {
        child: 'value',
        add:'',
        foo:'插槽传递过来的参数'
      }
    },
    // inject:{
    //   pro:'pro'
    // },
    mounted(){
      this.$parent.$on('foo', (msg) => {
        console.log('msg'+msg)
      })
    },
    methods: {
      handle() {
        this.$parent.$emit('foo','23444')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>