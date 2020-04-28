<template>
  <div class="user-nav">

    <el-popover
      placement="bottom"
      trigger="hover">

      <div class="hover-ops">
        <p class="user-name text-overflow">{{userName}}</p>
        <el-button
          class="width-100"
          @click="logout"
          size="small">
          <span>Logout</span>
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>

      <el-button slot="reference">
        <i class="el-icon-user-solid"></i>
        <span>User Center</span>
      </el-button>

    </el-popover>

  </div>
</template>

<script>

import { getUserInfo, removeCookies } from '@/util';

export default {
  name: 'user-nav',

  data() {
    return {
      userName: '',
    }
  },

  created() {
    const { userName } = getUserInfo();
    this.userName = userName;
  },

  methods: {
    logout() {
      removeCookies(['userName', 'token']);
      this.$router.push({ name: 'login' });
    }
  }
}

</script>

<style scoped>

.hover-ops{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-name{
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  text-align: center;
  margin-bottom: 10px;
}

</style>