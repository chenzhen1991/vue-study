<template>
  <div>
<!--    <button @click="handle">点我点我</button>-->
<!--    <div>{{add}}</div>-->
<!--    <p>{{$attrs.refresh}}</p>-->
<!--&lt;!&ndash;    <p>{{pro}}</p>&ndash;&gt;-->
<!--    <div>-->
<!--      插槽-->
<!--      <slot></slot>-->
<!--      <slot name='nameSlot'></slot>-->
<!--      <slot name='name1' :foo='foo'></slot>-->
<!--    </div>-->
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}</p>
<!--    <p>double {{$store.getters.doubleCount}}</p>-->
  </div>
</template>

<script>
  export default {
    name:'HelloWorld'
  }
</script>

<style lang="scss" scoped>

</style>