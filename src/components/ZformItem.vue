<template>
  <div>
    <!-- 这个组件主要就是为了展示一个独立的item  包括label, 输入框，以及错误提示 -->
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter";
export default {
  name:'ZFormItem',
  componentName:'ZFormItem',
  mixins: [emitter],
  provide(){
    return {
      formItem: this
    }
  },
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      //字段名
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    console.log(this.form);
    this.$on("validate", () => {
      this.validate();
    });

    //派发事件通知KForm,新增一个kFormItem实例
    this.dispatch('ZForm','zzz.form.addField',[this])
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const discriptor = { [this.prop]: rules };
      const schema = new Schema(discriptor);
      return new Promise((resolve, reject) => {
        console.log(schema);
        schema.validate({ [this.prop]: value }, errors => {
          console.log(errors);
          if (errors) {
            this.error = errors[0].message;
            reject()
          } else {
            this.error = "";
            resolve()
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>