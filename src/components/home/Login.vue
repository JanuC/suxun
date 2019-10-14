<template>
  <div class="login">
    <el-form :model="ruleForm"  ref="ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" prop="username" v-model="ruleForm.username" @blur="check"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" prop="password" v-model="ruleForm.password" type="password" @blur="check"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" :disabled="ruleForm.checked">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        checked: true
      }
    }
  },
  methods: {
    check() {
      this.ruleForm.checked = this.ruleForm.username != '' && this.ruleForm.password !='' ?
      false : true
    },
    login() {

    }
  },
};
</script>

<style>
</style>