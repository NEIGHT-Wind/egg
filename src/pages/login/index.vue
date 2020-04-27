<template>
  <div class="login-warpper" :style="warpperStyle">
    <div class="login-form" v-loading="loading">

      <div class="form-title">
        <p class="main-title">留存每一个笑容</p>
        <p class="sub-title">没有用户名会自动注册哦~</p>
      </div>

      <el-form
        class="form-box"
        ref="login-form"
        :model="formData"
        :rules="rules">
        <el-form-item prop="userName">
          <el-input
            class="width-300"
            v-model="formData.userName"
            placeholder="用户名"
            clearable></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            class="width-300"
            v-model="formData.passWord"
            placeholder="密码"
            show-password
            clearable></el-input>
        </el-form-item>
      </el-form>

      <div class="form-submit">
        <el-button
          class="width-100"
          type="primary"
          @click="submitLogin">登录</el-button>
      </div>

    </div>

    <div class="login-background"></div>
  </div>
</template>

<script>

import { getCookies, setCookies } from '@/util';
import api from '@/api';

export default {
  name: 'Login',

  data() {
    const reg = /[@#\$%\^&\*]+/; // eslint-disable-line

    const validateFunc = (rule, value, callback) => {
      if (value !== '' && reg.test(value)) {
        callback(new Error('存在非法字符'));
        return;
      }
      callback();
    };

    return {
      warpperStyle: {
        height: `${window.innerHeight}px`
      },

      formData: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateFunc, trigger: 'change' },
          { validator: validateFunc, trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateFunc, trigger: 'change' },
          { validator: validateFunc, trigger: 'blur' }
        ]
      },
      loading: false
    };
  },

  created() {
    const { token } = getCookies();
    if (token) {
      this.$router.push({ name: 'home' });
    }

    window.addEventListener('resize', this.getWarpperHeight);
  },

  methods:{
    getWarpperHeight(){
      this.warpperStyle.height = `${window.innerHeight}px`;
    },

    submitLogin() {
      this.$refs['login-form'].validate(res => {
        if (res) {
          const params = {
            ...this.formData
          };

          this.loading = true;
          api.loginSubmit(params)
            .then(res => {
              this.loading = false;
              if (res.token) {
                setCookies({
                  userName: params.userName,
                  token: res.token
                });
                this.$router.push({ name: 'home' });
                return;
              }
              return Promise.reject();
            })
            .catch(() => {
              this.loading = false;
              this.$message({
                message: '用户登录失败！请重试',
                center: true,
                type: 'error'
              });
            });
        }
      });

    }
  },

  destroyed(){
    window.removeEventListener('resize', this.getWarpperHeight)
  }
}

</script>

<style scoped>

.login-warpper{
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: 800px !important;
  min-height: 610px !important;
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

.login-form{
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

.form-title{
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

.form-box{
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.form-submit{
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-form-item{
  margin-bottom: 0px;
}

</style>
