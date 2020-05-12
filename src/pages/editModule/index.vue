<template>
  <div class="edit-warpper">

    <div class="edit-nav">
      <div class="nav-title">
        <i
          class="el-icon-arrow-left back-icon"
          @click="backTo"
        ></i>
        <p class="title-text text-overflow">{{title}}</p>
      </div>
    </div>

    <div
      class="edit-content"
      v-loading="loading">
      
      <div class="btn-group">
        <el-button
          v-if="!editStatus"
          type="primary"
          @click="edit">Edit</el-button>
        <el-button
          v-if="editStatus"
          type="primary"
          @click="save">Save</el-button>
        <el-button
          v-if="editStatus"
          @click="cancel">Cancel</el-button>
      </div>

      <module-form
       :edit-status="editStatus"></module-form>

    </div>

  </div>
</template>

<script>

import { menuList } from '@/config';
import moduleForm from './form';

export default {
  name: 'editModule',

  components: {
    'module-form': moduleForm
  },

  data() {
    return {
      loading: false,
      editStatus: false,
      moduleList: [],
      moduleInputMap: {},
    };
  },

  computed: {
    title() {
      const { id } = this.$route.params;
      const bizConfig = menuList.find(item => item.id === id) || {};
      return `Edit module - ${bizConfig.title || id}`;
    }
  },

  methods: {
    backTo() {
      this.$router.go(-1);
    },

    edit() {
      this.editStatus = true;
    },

    save() {
      this.editStatus = false;
    },

    cancel() {
      this.editStatus = false;
    }
  }

}

</script>

<style scoped>

.edit-warpper{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.edit-nav{
  height: 40px;
  font-size: 22px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.nav-title{
  display: flex;
  align-items: center;
}

.title-text{
  width: 300px;
}

.back-icon:hover{
  cursor: pointer;
}

.edit-content{
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 40px;
}

.btn-group{
  margin-bottom: 20px;
}


</style>