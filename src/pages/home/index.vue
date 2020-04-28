<template>
  <el-container class="home-warpper">
    <el-header>

      <div class="logo">
        <p class="logo-text">Beautiful Sunset</p>
      </div>

      <user-nav></user-nav>

    </el-header>

    <el-container class="home-content">

      <el-aside width="200px">
        <home-meun></home-meun>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>

import userNav from './userNav';
import homeMeun from './homeMeun';

export default {
  name: 'Home',

  components: {
    'user-nav': userNav,
    'home-meun': homeMeun
  }
}

</script>

<style scoped>

.home-warpper{
  flex: 1;
  display: flex;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #B3C0D1;
  color: #333;
}

.home-content{
  flex: 1;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>