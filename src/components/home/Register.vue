<template>
  <div class="register">
    <!-- <el-button :plain="true" @click="success">成功</el-button>
    <el-button :plain="true" @click="error">失败</el-button> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username" >
        <el-input placeholder="请输入用户名" prop="username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="phone" >
        <el-input placeholder="请输入手机号" prop="phone" v-model="ruleForm.phone" type="number"
     ></el-input>
      </el-form-item>
      <el-form-item prop="password" >
        <el-input placeholder="请输入密码" prop="password" v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
    
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

// 引入 bus
import Bus from '@/assets/bus/bus.js'



export default {
    data() {
        return {
            ruleForm: {
                username: '',
                phone: '',
                password: '' 
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 1, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 发送请求,注册
            axios
            .post('http://192.168.31.19:3001/myapi/register',this.ruleForm)
            .then((res) => {
              console.log(res);
              // 根据后台返回信息判断是否注册成功
              const code = res.data.err_code
              if(code === 200) {
                // 说明注册成功
                this.success()

                // 3s后跳转到登录组件
                setTimeout(() => {
                  location.hash = '/home/login'
                }, 3000);
              }else if(code === 1) {
                // 说明该手机号已经注册过,提醒用户直接登录
                this.error()
                location.hash = '/home/login'
              }
              // 清空输入框
              // this.ruleForm.username = this.ruleForm.password= this.ruleForm.phone = ''

              // 遍历数组,置为空
              for( let k in this.ruleForm) {
                this.ruleForm[k] = ''
              }
              
            })
            .catch((err) => {
              console.log(err);
              
            }) 
            
            
          } else {
            console.log('error submit!!');
            return false;
          }
          
        });
      },
      success() {
         this.$message({
           message: '恭喜你,注册成功,3s后跳转至登录页面',
           type: 'success',
           center: true
         });
      },
      error() {
      this.$message({
        message: '该手机号已注册,请直接登录',
        type: 'error',
        center: true
        })
    }
    }
};
</script>

<style>
</style>