<template>
  <div>
    <input :value="value" @input="onIput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  // inject:['formItem'],
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onIput(e) {
      this.$emit("input", e.target.value);
      // this.$parent.$emit('validate');
    //   this.formItem.$emit("validate");
        this.dispatch('ZFormItem','validate')
    }
  },
  mounted() {
    console.log(this.$attrs);
  }
};
</script>

<style lang="scss" scoped>
</style>