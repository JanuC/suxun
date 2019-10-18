<template>
  <div class="login">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" prop="username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          prop="password"
          v-model="ruleForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

// 引入 bus
import Bus from "@/assets/bus/bus.js";

export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (
        value === "" ||
        value.length < 3 ||
        value.length > 7 ||
        !/\[a-zA-z\d]/
      ) {
        callback(new Error("用户名不能为空,且3-7位,只能为数字和字母"));
      } else {
        callback();
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (value === "" || value.length < 4 || value.length > 10) {
        callback(new Error("密码为4-10位,不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checked: true
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          // 点击登录,发送请求到后台
          axios
            .post("http://192.168.31.19:3001/myapi/login", this.ruleForm)
            .then(res => {
              console.log(res);
              const code = res.data.err_code;

              //获取该用户对应的表
              const tableName = res.data.tableName;
              if (code === 200) {
                // 登录成功,跳转到首页

                // 将tableName 存储在localStorage中
                localStorage.setItem("tableName", tableName);
                // 将用户id存在localStorage中
                localStorage.setItem("userid", res.data.userid);

                // 将 token 保存在 localStorage 中
                localStorage.setItem("token", res.data.token);
                location.hash = "/index/contacts";
              } else if (code === 1) {
                // 登录失败
                this.error();
              }
            });
        }
      });
    },
    error() {
      this.$message({
        message: "用户名或密码错误",
        type: "error",
        center: true
      });
    }
  }
};
</script>

<style>
</style>