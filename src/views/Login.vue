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
      this.$store
        .dispatch('user/login', {username: this.username})
        .then(() => {
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