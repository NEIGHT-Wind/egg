<template>
  <div class="module-form">

    <div
      v-if="editStatus"
      class="add-module">
      <el-input
        class="width-300 mr10"
        v-model="addModule"></el-input>
      <el-button
        type="primary"
        @click="add">add</el-button>
    </div>

    <el-form
      ref="module-form"
      :model="formData"
      :rules="rules">

      <el-form-item
        v-for="(item, index) in moduleList"
        :key="item.id"
        :prop="item.id"
        :label="`${index + 1}.`">
        <el-input
          class="width-300 mr10"
          v-model="formData[item.id].value"
          :disabled="formData[item.id].disabled"></el-input>
        <template v-if="editStatus">
          <el-button
            type="primary"
            @click="remove(item.id)"
            icon="el-icon-delete"></el-button>
          <el-button
            type="primary"
            @click="rename(item.id)">rename</el-button>
          <el-button
            type="primary"
            @click="remove(item.id)"
            icon="el-icon-caret-top"></el-button>
          <el-button
            type="primary"
            @click="remove(item.id)"
            icon="el-icon-caret-bottom"></el-button>
          </template>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

import { meunModuleStorageKey } from '@/config';
import { getStorage } from '@/util';

export default {
  name: 'moduleForm',

  props: {
    editStatus: {
      type: Boolean,
      default: false
    }
  },

  data() {

    return {
      addModule: '',
      formData: {},
      rules: {
        // userName: [
        //   { required: true, message: 'Please input user name', trigger: 'blur' },
        //   { validator: validateFunc, trigger: 'change' },
        //   { validator: validateFunc, trigger: 'blur' }
        // ],
        // passWord: [
        //   { required: true, message: 'Please input password', trigger: 'blur' },
        //   { validator: validateFunc, trigger: 'change' },
        //   { validator: validateFunc, trigger: 'blur' }
        // ]
      },
      moduleList: []
    };
  },

  created() {
    this.getModule();
  },

  methods: {
    getModule() {
      const menuModule = getStorage(meunModuleStorageKey) || {};
      this.moduleList = menuModule[this.$route.params.id] || [];

      let formData = {};
      this.moduleList.forEach(item => {
        formData[item.id] = {
          value: item.title,
          disabled: true
        };
      });
      this.formData = formData;
    },
    
    add() {
      
    },

    remove(moduleId) {

    },

    rename(moduleId) {

    }
  }
}

</script>

<style scoped>

.module-form{
  flex: 1;
}

.add-module{
  margin-bottom: 20px;
}

</style>
