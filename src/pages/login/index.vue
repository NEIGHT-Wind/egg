<template>
  <div class="login-warpper">
    <div class="login-content">

      <div class="content-title">
        <div class="title-box">
          <p class="main-title">Save every smile</p>
          <p class="title-chinese">留存每一个笑容</p>
        </div>

        <div class="title-box">
          <p class="sub-title">No user name will be automatically registered~</p>
          <p class="title-chinese">没有用户名自动注册哦~</p>
        </div>

      </div>

      <login-form></login-form>
    </div>

    <div class="login-background"></div>
  </div>
</template>

<script>

import { getCookies } from '@/util';
import loginForm from './loginForm';

export default {
  name: 'Login',

  components: {
    'login-form': loginForm
  },

  created() {
    const { token } = getCookies();
    if (token) {
      this.$router.push({ name: 'home' });
    }
  }
}

</script>

<style scoped>

.login-warpper{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.6;
  z-index: 0;
}

.login-content{
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 400px;
  padding: 10px 30px;
  box-shadow: 5px 5px 5px #f5f5f5, 5px -5px 5px #f5f5f5, -5px 5px 5px #f5f5f5, -5px -5px 5px #f5f5f5;
  border-radius: 10px;
  background-color: #fff;
  z-index: 99;
}

.content-title{
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.title-box{
  text-align: center;
}

.main-title{
  font-size: 24px;
  color: #707070;
  font-weight: 700;
}

.sub-title{
  font-size: 18px;
  color: #707070;
}

.title-chinese{
  font-size: 14px;
  color: #A0A0A0;
  margin-top: 10px;
}

</style>
