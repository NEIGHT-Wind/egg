<template>
  <el-container class="home-warpper">
    <el-header>

      <div class="logo">
        <p class="logo-text">Precious Recollection</p>
      </div>

      <user-nav></user-nav>

    </el-header>

    <el-container class="home-content">

      <el-aside width="200px">
        <home-menu></home-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import userNav from './userNav';
import homeMenu from './homeMenu';

export default {
  name: 'Home',

  components: {
    'user-nav': userNav,
    'home-menu': homeMenu
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
  display: flex;
}

.el-aside {
  display: flex;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  flex: 1;
  display: flex;
}

</style>