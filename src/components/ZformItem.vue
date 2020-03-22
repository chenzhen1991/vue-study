<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Scheme from "async-validator";
console.dir(Scheme);
export default {
  inject: ["form"],
  provide() {
    return {
      formItem: this
    };
  },
  data() {
    return {
      error: ""
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      console.log(this.form.model);
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const disriptor = { [this.prop]: rules };
      console.log(rules);
      const scheme = new Scheme(disriptor);
      console.log(scheme);
      return new Promise((resolve, reject) => {
        console.log(990);

        scheme.validate({ [this.prop]: value }, errors => {
          console.log(errors);
          if (errors) {
            this.error = errors[0].message;
            reject();
          } else {
            this.error = "";
            resolve();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>