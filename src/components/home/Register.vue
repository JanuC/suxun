<template>
  <div class="register">
    <!-- <el-button :plain="true" @click="success">成功</el-button>
    <el-button :plain="true" @click="error">失败</el-button>-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" prop="username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input placeholder="请输入手机号" prop="phone" v-model="ruleForm.phone" type="number"></el-input>
      </el-form-item>
      <el-form-item prop="password">
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
import axios from "axios";

// 引入 bus
import Bus from "@/assets/bus/bus.js";

export default {
  data() {
    let validePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误,请重新输入"));
      } else {
        this.ruleForm.dis = false;
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        phone: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" }
        ],
        phone: [{ validator: validePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送请求,注册
          axios
            .post("http://192.168.31.19:3001/myapi/register", this.ruleForm)
            .then(res => {
              console.log(res);
              // 根据后台返回信息判断是否注册成功
              const code = res.data.err_code;
              if (code === 200) {
                // 说明注册成功
                this.success();

                // 3s后跳转到登录组件
                setTimeout(() => {
                  location.hash = "/home/login";
                }, 3000);
              } else if (code === 1) {
                // 说明该手机号已经注册过,提醒用户直接登录
                this.error(res.data.message);
                location.hash = "/home/login";
              }else {
                // 用户名已注册,让用户重新输入
                 this.error(res.data.message);
              }
              // 清空输入框
              // this.ruleForm.username = this.ruleForm.password= this.ruleForm.phone = ''

              // 遍历数组,置为空
              for (let k in this.ruleForm) {
                this.ruleForm[k] = "";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    success() {
      this.$message({
        message: "恭喜你,注册成功,3s后跳转至登录页面",
        type: "success",
        center: true
      });
    },
    error(msg) {
      this.$message({
        message: msg,
        type: "error",
        center: true
      });
    }
  }
};
</script>

<style>
</style>