<template>
  <div class="mains">
    <h2>添加联系人</h2>
    <div class="form">
      <el-form label-position="left" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input placeholder="请输入电话号码" v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-select  placeholder="请选择" v-model="ruleForm.value">
            <el-option 
              v-for="item in ruleForm.options" 
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" width="100px" @click="addPerson" :disabled="ruleForm.dis">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    var validateName = (rule,value,callback) => {
      if(value === '' || /\s/.test(value) || value.length < 1 ||value.length > 7) {
        callback(new Error('姓名不能为空,不能包含空格,1-7个字符之间'))
      }else {
        callback()
      }
    }
    var validateTel = (rule,value,callback) => {
      if(!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号码有误,请重新输入'))
      }else {
        this.ruleForm.dis = false
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        tel: '',
        dis: false,
        options: [
          {value: 'family',label:'家人'},
          {value: 'friend',label:'朋友'},
          {value: 'colleague',label:'同事'}
        ],
        value: 'family'
      },
      rules: {
        name: [{validator: validateName, trigger: 'blur'}],
        tel: [{validator: validateTel,trigger: 'blur'}]
      }
    }
  },
  methods: {
    addPerson() {
      this.$refs['ruleForm'].validate(valid => {
        if(valid) {
          // 校验成功,发送请求
          axios
            .post('http://192.168.31.19:3001/myapi/add',{
              name: this.ruleForm.name,
              tel: this.ruleForm.tel,
              lable: this.ruleForm.value,
              tName: localStorage.getItem('tableName')
            })
            .then(res => {
              if(res.data.err_code === 200) {
                // alert('添加成功')
                this.message()
                // 将input置为空
                this.ruleForm.name = ''
                this.ruleForm.tel = ''
                this.ruleForm.value = 'family'
              }
              
            })
        }else {
          console.log(2);
          this.ruleForm.dis = true
        }
      }) 
      
    },
    // 消息提示
    message() {
      this.$message({
        message: '添加成功',
        type: 'success',
        center: true
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/add.less";
</style>
