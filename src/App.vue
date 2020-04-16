<template>
  <div id="app">
      <Sidebar></Sidebar>
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
import Sidebar from "@/components/Sidebar";
// 修改alias后的修改
export default {
  name: 'App',
  components: {
      Sidebar
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
