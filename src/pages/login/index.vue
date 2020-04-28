<template>
  <div class="login-warpper">
    <div class="login-content">

      <div class="content-title">
        <p class="main-title">留存每一个笑容</p>
        <p class="sub-title">没有用户名会自动注册哦~</p>
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
  width: 300px;
  height: 300px;
  padding: 30px 50px;
  box-shadow: 5px 5px 5px #f5f5f5, 5px -5px 5px #f5f5f5, -5px 5px 5px #f5f5f5, -5px -5px 5px #f5f5f5;
  border-radius: 10px;
  background-color: #fff;
  z-index: 99;
}

.content-title{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-title{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.sub-title{
  font-size: 14px;
  color: #A0A0A0;
}
</style>
