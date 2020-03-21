<template>
  <div>
    <!-- 这个组件主要就是为了展示一个独立的item  包括label, 输入框，以及错误提示 -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: { //字段名
      type: String,
      default:""
    }
  },
  data() {
      return {
          message: ''
      }
  },
};
</script>

<style lang="scss" scoped>
</style>