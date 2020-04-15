<template>
  <div id="app">
<!--    <svg>-->
<!--      <use xlink:href="#icon-auto" />-->
<!--    </svg>-->
      <div>
          <router-link to="/"><svg-icon icon-class="auto"></svg-icon>Home</router-link>
          <router-link to="/about">About</router-link>
      </div>
      <!-- 路由出口 -->
      <router-view />
  </div>
</template>

<script>
import '@/icon/svg/auto.svg';
// import Login from './components/Login.vue'
// 修改alias后的修改
export default {
  name: 'App',
  components: {}
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
