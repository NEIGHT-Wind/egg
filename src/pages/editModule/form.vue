<template>
  <div
    class="module-form"
    v-loading.fullscreen.lock="loading">

    <div
      v-if="editStatus"
      class="add-module">
      <el-input
        class="width-300 mr10"
        v-model="addModule"></el-input>
      <el-button
        type="primary"
        @click="add"
        :disabled="!addModule">add</el-button>
    </div>

    <el-form
      ref="module-form"
      :model="formData"
      :rules="rules"
      label-width="20px">

      <el-form-item
        v-for="(item, index) in moduleList"
        :key="item.id"
        :prop="item.id"
        :label="`${index + 1}.`">
        <el-input
          class="width-300 mr10"
          v-model="formData[item.id].value"
          :disabled="!editStatus"></el-input>
        <template v-if="editStatus">
          <el-button
            type="primary"
            @click="remove(item.id)"
            icon="el-icon-delete"></el-button>
          <el-button
            v-if="index !== 0"
            type="primary"
            @click="up(index)"
            icon="el-icon-caret-top"></el-button>
          <el-button
            v-if="index !== moduleList.length - 1"
            type="primary"
            @click="down(index)"
            icon="el-icon-caret-bottom"></el-button>
          </template>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

import { meunModuleStorageKey, IllegalCharactersReg } from '@/config';
import { getStorage } from '@/util';
import api from '@/api';

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
      rules: {},
      moduleList: [],
      loading: false
    };
  },

  created() {
    this.initData();
  },

  methods: {
    validateFunc(rule, { value }, callback) {
      if (value === '') {
        callback(new Error('Please input module name'));
        return;
      }
      if (value !== '' && IllegalCharactersReg.test(value)) {
        callback(new Error('Illegal characters present'));
        return;
      }
      callback();
    },

    initData() {
      const menuModule = getStorage(meunModuleStorageKey) || {};
      const moduleList = menuModule[this.$route.params.id] || [];

      let formData = {};
      let rules = {};
      moduleList.forEach(item => {
        formData[item.id] = {
          value: item.title
        };
        rules[item.id] = [
          { validator: this.validateFunc, trigger: 'change' }
        ];
      });

      this.moduleList = moduleList;
      this.formData = formData;
      this.rules = rules;
    },

    add() {
      if (IllegalCharactersReg.test(this.addModule)) {
        this.$message({
          message: 'Illegal characters present',
          center: true,
          type: 'error'
        });
        return;
      }
      const id = `new-${this.moduleList.length}`;
      this.moduleList = [
        ...this.moduleList,
        { title: this.addModule, id }
      ];

      this.formData = {
        ...this.formData,
        [id]: {
          value: this.addModule,
          isAdd: true
        }
      };

      this.rules = {
        ...this.rules,
        [id]: [
          { validator: this.validateFunc, trigger: 'change' }
        ]
      };

      this.addModule = '';
    },

    removeCB(moduleId) {
      this.moduleList = this.moduleList.filter(item => item.id !== moduleId);

      let data = { ...this.formData };
      delete data[moduleId];
      this.formData = data;

      let rules = { ...this.rules };
      delete rules[moduleId];
      this.rules = rules;
    },

    remove(moduleId) {
      const { value, isAdd } = this.formData[moduleId];
      if (isAdd) {
        this.removeCB(moduleId);
        return;
      }
      this.$confirm(
        `Deleting the module will also delete the uploaded data under the module.
        Are you sure you want to delete the "${value}" module?`,
        'Delete Module',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => { this.removeCB(moduleId) })
      .catch(() => {});
    },

    up(index) {
      let data = [ ...this.moduleList ];
      data[index] = this.moduleList[index - 1];
      data[index - 1] = this.moduleList[index];
      this.moduleList = data;
    },

    down(index) {
      let data = [ ...this.moduleList ];
      data[index] = this.moduleList[index + 1];
      data[index + 1] = this.moduleList[index];
      this.moduleList = data;
    },

    submit() {
      return new Promise((resovle, reject) => {
        this.$refs['module-form'].validate(res => {
          if (res) {
            const params = {
              editModuleId: this.$route.params.id,
              editModule: this.moduleList.map(item => {
                const { value, isAdd } = this.formData[item.id];
                return {
                  id: isAdd ? '' : item.id,
                  title: value,
                  isAdd: !!isAdd
                }
              })
            };

            this.loading = true;
            api.editModuleSubmit(params)
              .then(res => {
                this.$message({
                  message: 'Modification succeeded',
                  center: true,
                  type: 'success'
                });
                resovle(res);
              })
              .catch(rej => {
                this.$message({
                  message: 'Failed to modify module! Please try again',
                  center: true,
                  type: 'error'
                });
                reject(rej);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            reject();
          }
        });
      });
    },

    cancel() {
      this.initData();
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
