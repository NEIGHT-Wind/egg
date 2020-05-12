<template>
  <div class="menu-box">
    <el-menu
      class="menu"
      v-loading.fullscreen.lock="loading"
      background-color="#545c64"
      text-color="#fff"
      :default-active="currentSubMenu"
      :default-openeds="currentSubMenuArr"
      router>

      <el-submenu
        v-for="bizItem in menuList"
        :key="bizItem.id"
        :index="bizItem.id">
        <template slot="title">
          <i :class="bizItem.icon"></i>
          <span>{{bizItem.title}}</span>
        </template>

        <el-menu-item
          v-for="moduleItem in bizItem.children"
          :style="moduleItem.isCurrentRoute ? currentRouteStyle : {}"
          :key="moduleItem.id"
          :index="moduleItem.id"
          :route="moduleItem.routeConfig">
          <span slot="title">{{moduleItem.title}}</span>
        </el-menu-item>

      </el-submenu>

    </el-menu>
  </div>
</template>

<script>

import { menuList, meunModuleStorageKey } from '@/config';
import { setStorage } from '@/util';
import api from '@/api';

export default {
  name: 'homeMenu',

  data() {
    return {
      loading: false,
      currentRouteStyle: { color: '#ffd04b' },

      currentSubMenu: '',
      currentSubMenuArr: [],
      menuList: []
    };
  },

  watch: {
    '$route'() {
      // linkto / 手动修改url 后 会watch到并同步导航样式
      this.menuList = this.setCurrentRoute(this.menuList);
    }
  },

  created() {
    this.getMenuModule();
  },

  methods: {
    addModuleRoute(res) {
      return menuList.map(bizItem => ({
        ...bizItem,
        children: [
          // default route
          ...bizItem.children,

          // module route
          ...res[bizItem.id].map(moduleItem => ({
            ...moduleItem,
            routeConfig: {
              name: `${bizItem.id}Module`,
              params: { id: moduleItem.id }
            }
          }))
        ]
      }));
    },

    isSameRoute(routerParams, configParams) {
      const { name, params } = routerParams;
      // 如果id一致判断id
      return params.id && configParams.params ?
        (
          name === configParams.name &&
          params.id === configParams.params.id
        )
      : name === configParams.name;
    },

    setCurrentRoute(list) {
      let currentSubMenu = '';
      let isCurrentRoute = false;

      // set isCurrentRoute 属性用于样式展示 ele-ui的样式无法与router同步
      const dealList = list.map(bizItem => ({
        ...bizItem,
        children: bizItem.children.map(moduleItem => {
          isCurrentRoute = false;

          if (this.isSameRoute(this.$route, moduleItem.routeConfig)) {
            isCurrentRoute = true;
            currentSubMenu = bizItem.id;
          }
          return {
            ...moduleItem,
            isCurrentRoute
          };
        })
      }));

      // 打开当前submenu
      if (currentSubMenu) {
        this.currentSubMenu = currentSubMenu;
        this.currentSubMenuArr = [currentSubMenu];
      } else {
        this.currentSubMenu = '';
        this.currentSubMenuArr = [];
      }

      return dealList;
    },

    getMenuModule() {
      this.loading = true;
      api.getMenuModuleList()
        .then(res => {
          this.loading = false;

          setStorage(meunModuleStorageKey, res);

          let list = [];
          list = this.addModuleRoute(res);
          list = this.setCurrentRoute(list);
          this.menuList = list;
        });
    }
  }
}

</script>

<style scoped>

.menu-box{
  flex: 1;
  display: flex;
}

.menu{
  flex: 1;
}

.el-menu{
  border-right: 0px;
}
</style>