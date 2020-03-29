<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
   name:'ZForm',
  componentName:'ZForm',
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
  created(){
    this.fields = []
    this.$on('zzz.form.addField',item => {
      this.fields.push(item)
    })
  },
  methods: {
    validate(cb) {
      console.log(cb);
      // const tasks = this.$children
      //   .filter(item => item.prop)
      //   .map(item => item.validate());
      const tasks = this.fields
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