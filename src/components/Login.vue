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

    <Node :data="folder" :level="0"></Node>
    <Tree :data="treeData" :level="0"></Tree>
  </div>
</template>

<script>
import ZInput from "@/components/Zinput.vue";
import ZFormItem from "@/components/ZformItem.vue";
import ZForm from "@/components/Zform.vue";
import create from "@/utils/create";
import Notice from "@/components/Notice.vue";
import Node from '@/components/Node.vue';
import Tree from './Tree.vue';
export default {
  components: {
    ZInput,
    ZFormItem,
    ZForm,
    Node,
    Tree
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
      },
      folder: {
        name: "vue-study",
        children: [
          { name: "src", children: [{ name: "main.js" }] },
          { name: "package.json" }
        ]
      },
      treeData: [{
        title: "Web全栈架构师",
        children: [
          {
            title: "Java架构师"
          },
          {
            title: "JS⾼级",
            children: [
              {
                title: "ES6"
              },
              {
                title: "动效"
              }
            ]
          },
          {
            title: "Web全栈",
            children: [
              {
                title: "Vue训练营",
                expand: true,
                children: [
                  {
                    title: "组件化"
                  },
                  {
                    title: "源码"
                  },
                  {
                    title: "docker部署"
                  }
                ]
              },
              {
                title: "React",
                children: [
                  {
                    title: "JSX"
                  },
                  {
                    title: "虚拟DOM"
                  }
                ]
              },
              {
                title: "Node"
              }
            ]
          }
        ]
      }]
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