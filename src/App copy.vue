<template>
  <div id="app-copy">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" ref='wuhan'>
      <template>匿名插槽</template>
      <br/>
      <template v-slot:nameSlot>
          我是有名插槽 名字叫做 'nameSlot'
      </template>
      <hr/>
      <template v-slot:name1='slotProps'>
          我是2有名插槽 传递的参数为{{slotProps.foo}}
      </template>
    </HelloWorld>
    <HelloWorld msg="Welcome to Your Vue.js App" refresh='我是其他他的没有定义的属性'/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'AppCopy',
  components: {
    HelloWorld
  },
  methods: {
    
  },
  mounted () {
    this.$children[0].add='我是通过child拿到的'
    this.$refs.wuhan.add='修改add'
  },
  provide () {
    return {
      pro:'provide提供的数据'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
