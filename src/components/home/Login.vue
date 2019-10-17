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
import axios from 'axios'

// 引入 bus
import Bus from '@/assets/bus/bus.js'

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
    // 登录框是否可选
    check() {
      this.ruleForm.checked = this.ruleForm.username != '' && this.ruleForm.password !='' ?
      false : true
    },
    login() {
      // 点击登录,发送请求到后台
      axios
      .post('http://192.168.31.19:3001/myapi/login',this.ruleForm)
      .then((res) => {
        console.log(res);
        const code = res.data.err_code

        //获取该用户对应的表
        const tableName = res.data.tableName
        if(code === 200) {
          // 登录成功,跳转到首页
          
          // 将tableName 存储在localStorage中
          localStorage.setItem('tableName',tableName)
          // 将用户id存在localStorage中
          localStorage.setItem('userid',res.data.userid)
          location.hash = '/index/contacts'
        }else if(code === 1) {
          // 登录失败
          this.error()
        }
      })
    },
    error() {
      this.$message({
        message: '用户名或密码错误',
        type: 'error',
        center: true
        })
    }
  },
};
</script>

<style>
</style>