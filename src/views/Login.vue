<template>
  <div>
    <input type="text" v-model="username">
    <button @click="login">登录</button>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      username: 'admin'
    };
  },
  methods: {
    login() {
      console.log(234)
      this.$store
        .dispatch('user/login', {username: this.username})
        .then(() => {
          console.log('这里来过')
          this.$router.push({
            path: this.$route.query.redirect || '/'
          })
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>