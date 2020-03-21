<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    rules: {
      type: Object
    },
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    validate(cb) {
      console.log(cb);
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>