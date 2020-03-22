
<template>
  <div>
    <z-form :model="model" :rules="rules" ref='loginForm'> 
      <z-form-item label="用户名" prop="username">
        <z-input v-model="model.username" type="text" placeholder="请输入用户名" />
      </z-form-item>
      <z-form-item label="密码" prop="password">
        <z-input v-model="model.password" type="password" placeholder="请输入密码" />
      </z-form-item>
      <z-form-item>
       <button type="button" @click="login">登录</button>
      </z-form-item>
    </z-form>
  </div>
</template>

<script>
import ZInput from "@/components/Zinput.vue";
import ZFormItem from "@/components/ZformItem.vue";
import ZForm from "@/components/Zform.vue";
import create from '../utils/create';
import Notice from '@/components/Notice.vue';
export default {
  components: {
    ZInput,
    ZFormItem,
    ZForm
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    }
  },
  methods:{
    login () {
      this.$refs['loginForm'].validate((invalid)=>{
        console.log(invalid);
        if(invalid){
          create(Notice,{
            title:'提示',
            content:'登录成功',
            duration:1000
          }).show()
        }else{
          create(Notice,{
            title:'提示',
            content:'登录失败',
            duration:1000
          }).show()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>