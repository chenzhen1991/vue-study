<template>
  <div id="app">
<!--    <svg>-->
<!--      <use xlink:href="#icon-auto" />-->
<!--    </svg>-->
    <svg-icon icon-class="auto"></svg-icon>
    <Login />
  </div>
</template>

<script>
import '@/icon/svg/auto.svg';
// import Login from './components/Login.vue'
// 修改alias后的修改
import Login from 'comps/Login.vue'
export default {
  name: 'App',
  components: {
    Login
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
