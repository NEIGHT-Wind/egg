<template>
  <div id="app" class="app-warpper" :style="warpperStyle">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      warpperStyle: {
        height: `${window.innerHeight}px`
      },
    }
  },

  created() {
    window.addEventListener('resize', this.getWarpperHeight);
  },

  methods:{
    getWarpperHeight(){
      this.warpperStyle.height = `${window.innerHeight}px`;
    }
  },

  destroyed(){
    window.removeEventListener('resize', this.getWarpperHeight)
  }
}

</script>

<style scoped>

.app-warpper{
  width: 100%;
  min-width: 800px !important;
  min-height: 610px !important;
  display: flex;
}

</style>
