<template>
  <div>
    <z-form :rules="rules" :model="model" ref="loginForm">
      <z-form-item label="用户名" prop="username">
        <z-input v-model="model.username" type="text" placeholder="请输入用户名" />
      </z-form-item>
      <z-form-item label="密码" prop="password">
        <z-input v-model="model.password" type="password" placeholder="请输入密码" />
      </z-form-item>
      <z-form-item>
        <button @click="login" type="button">登录</button>
      </z-form-item>
    </z-form>
  </div>
</template>

<script>
import ZInput from "@/components/Zinput.vue";
import ZFormItem from "@/components/ZformItem.vue";
import ZForm from "@/components/Zform.vue";
import create from "@/utils/create";
import Notice from "@/components/Notice.vue";
export default {
  components: {
    ZInput,
    ZFormItem,
    ZForm
  },
  data() {
    return {
      model: {
        usename: "zzz",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    login() {
      console.log(this.$refs["loginForm"]);
      this.$refs["loginForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          create(Notice, {
            title: "温馨提示",
            content: "登陆成功",
            duration: 2000
          }).show();
        } else {
          create(Notice, {
            title: "警告",
            content: "请填写完整",
            duration: 200000000
          }).show();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>