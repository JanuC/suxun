<template>
  <el-container>
  <el-header class="header">
    <h1>速讯</h1>
    <div class="log">
      <span>你好~</span>
      <img src="../../../static/img/contact.jpg">
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <router-link to="/index/contacts" class="btns"><i class="fa fa-address-book-o" aria-hidden="true"></i> 通讯录</router-link>
      <router-link to="/index/add" class="btns"><i class="fa fa-bars" aria-hidden="true"></i>  添加信息</router-link>
      <router-link to="/index/own" class="btns"><i class="fa fa-user-o" aria-hidden="true"></i> 个人中心</router-link>
      <a href="#" class="logout" @click="logOut"><i class="fa fa-cog" aria-hidden="true"></i> 退出登录</a>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    // 退出登录
    logOut() {
      // 销毁 token
      localStorage.setItem('token','')
      // 跳转到登录页
      location.hash = '/home/Login' 
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/index.less';
</style>