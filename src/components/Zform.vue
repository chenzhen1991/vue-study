<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    props: {
      model: {
        type: Object
      },
      rules:{
        type:Object
      }
    },
    provide(){
      return{
        form: this
      }
    },
    methods: {
      validate(cb) {
        const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
        Promise.all(tasks)
        .then(()=>cb(true))
        .catch(()=>cb(false))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>