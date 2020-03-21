<template>
  <div>
    <z-form-item label="用户名" prop='model.username'>
      <z-input v-model="model.username" type='text' placeholder="请输入用户名"/>
    </z-form-item>
    <z-form-item label="密码" prop='model.password'>
      <z-input v-model="model.password" type='password' placeholder="请输入密码"/>
    </z-form-item>
  </div>
</template>

<script>
  import ZInput from '@/components/Zinput.vue';
  import ZFormItem from '@/components/ZformItem.vue';
  export default {
    components: {
      ZInput,
      ZFormItem
    },
    data() {
      return {
        model: {
          usename:'zzz',
          password:''
        },
         rules: {
          name: [
            { required: true, message: '请输入用户名' },
          ],
          password: [
            { required: true, message: '请输入密码'}
          ],
         }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>