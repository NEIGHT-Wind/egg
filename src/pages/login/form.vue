<template>
  <div v-loading="loading" class="login-form">
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
</template>

<script>

import { IllegalCharactersReg } from '@/config';
import { setCookies } from '@/util';
import api from '@/api';

export default {
  name: 'loginForm',

  data() {
    const validateFunc = (rule, value, callback) => {
      if (value !== '' && IllegalCharactersReg.test(value)) {
        callback(new Error('Illegal characters present'));
        return;
      }
      callback();
    };

    return {
      formData: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: 'Please input user name', trigger: 'blur' },
          { validator: validateFunc, trigger: 'change' },
          { validator: validateFunc, trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { validator: validateFunc, trigger: 'change' },
          { validator: validateFunc, trigger: 'blur' }
        ]
      },
      loading: false
    };
  },

  methods:{
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
                message: 'User login failed! Please try again',
                center: true,
                type: 'error'
              });
            });
        }
      });
    }
  }
}

</script>

<style scoped>

.login-form{
  flex: 3;
  display: flex;
  flex-direction: column;
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
