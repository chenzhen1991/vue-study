<template>
  <div v-if="isShow">
    <h3>{{title}}</h3>
    <p>{{content}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      content:{
        type: String,
        default: ''
      },
      duration:{
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      show() {
        this.isShow = true
        setTimeout(this.hide,this.duration)
      },
      hide(){
        console.log(8)
        this.isShow = false
        this.move()
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>