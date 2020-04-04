<template>
  <div>
    <p>index 页面</p>
    <p @click="$store.commit('add')">{{$store.state.count}}</p>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
      console.log(222,store);
      
    return store.dispatch("getCount");
  }
};
</script>

<style lang="scss" scoped>
</style>