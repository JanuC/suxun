<template>
  <div class="register">
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
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                phone: '',
                passworld: '' 
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.$refs.ruleForm);
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
};
</script>

<style>
</style>