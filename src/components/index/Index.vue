<template>
  <el-container>
  <el-header id="header">
    <h1>速讯</h1>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <router-link to="/index/contacts" class="btns"><i class="fa fa-address-book-o" aria-hidden="true"></i> 通讯录</router-link>
      <router-link to="/index/add" class="btns"><i class="fa fa-bars" aria-hidden="true"></i>  添加信息</router-link>
      <router-link to="/index/own" class="btns"><i class="fa fa-user-o" aria-hidden="true"></i> 个人中心</router-link>
      <a href="#" class="logout"><i class="fa fa-cog" aria-hidden="true"></i> 退出登录</a>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/index.less';
</style>