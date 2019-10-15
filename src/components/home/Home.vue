<template>
  <div class="container">
    <div class="main">
      <h1>速 讯</h1>
      <h2>拉近我们心灵的距离，感知爱与陪伴</h2>
      <div class="btns">
          <router-link to="/home/Register">注册</router-link>
          <router-link to="/home/Login">登录</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="less">
@import "../../assets/css/home.less";
</style>