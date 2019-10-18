<template>
  <div class="content">
    <h2>个人信息</h2>
    <div class="message">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="姓名:" prop="username">
          <span v-show="isShow">{{ ruleForm.username }}</span>
          <el-input v-model="ruleForm.username" v-show="!isShow"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" prop="tel">
          <span v-show="isShow">{{ ruleForm.tel }}</span>
          <el-input v-model="ruleForm.tel" v-show="!isShow"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <span v-show="isShow">{{ ruleForm.password }}</span>
          <el-input v-model="ruleForm.password" v-show="!isShow"></el-input>
        </el-form-item>
        <el-form-item v-show="isShow" class="btn">
          <el-button type="primary" @click="updateMsg">编辑信息</el-button>
        </el-form-item>
        <el-form-item v-show="!isShow" class="btn">
          <el-button type="primary" class="pre" @click="preserve">保存</el-button>
          <el-button type="info" class="back" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 表单校验
    let validateName = (rule, value, callback) => {
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
    let validateTel = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误,请检查"));
      } else {
        callback();
      }
    };
    let validatePsd = (rule, value, callback) => {
      if (value === "" || value.length < 4 || value.length > 10) {
        callback(new Error("密码为4-10位,不能为空"));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        username: "",
        tel: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
        password: [{ validator: validatePsd, trigger: "blur" }]
      },
      isShow: true,
      oldMsg: ""
    };
  },
  created() {
    // 一进入该页面,发送请求获取数据
    // 先获取存在localStorage中的userid
    const userid = localStorage.getItem("userid");
    axios
      .post("http://192.168.31.19:3001/myapi/usermsg", { userid: userid })
      .then(res => {
        // console.log(res);
        this.ruleForm.username = res.data.list.username;
        this.ruleForm.tel = res.data.list.tel;
        this.ruleForm.password = res.data.list.password;
      });
  },
  methods: {
    // 点击编辑
    updateMsg() {
      this.isShow = false;
      // 将原来的信息保存
      this.oldMsg = JSON.stringify(this.ruleForm);
    },
    // 保存
    preserve() {
      // 先对表单进行校验
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.isShow = true;
          // 获取现在的信息
          const str = JSON.stringify(this.ruleForm);
          if (str === this.oldMsg) {
            // 两个相等,用户最终并没有修改
            return;
          } else {
            // 发生了修改,发送请求修改数据
            axios
              .post("http://192.168.31.19:3001/myapi/updateuser", {
                userid: localStorage.getItem("userid"),
                list: this.ruleForm
              })
              .then(res => {
                if (res.data.err_code === 200) {
                  // 操作成功
                  return;
                } else {
                  // 操作失败
                  alert("操作失败");
                  this.ruleForm = JSON.parse(this.oldMsg);
                }
              });
          }
        }
      });
    },
    back() {
      this.isShow = true;
      // 放弃操作,直接将原来的值赋值给ruleForm
      this.ruleForm = JSON.parse(this.oldMsg);
    }
  }
};
</script>

<style>
.message .el-form-item__label {
  font-size: 20px !important;
}
.message .el-button {
  width: 220px;
}
.message .pre,
.message .back {
  width: 100px;
}
.message .btn {
  margin-left: -60px;
}
.message .el-input {
  height: 43px;
  width: 252px;
}
.message .back {
  margin-left: 60px;
}
</style>
<style lang="less"  scoped>
@import "../../assets/css/own.less";
</style>
