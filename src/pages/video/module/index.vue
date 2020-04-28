<template>
  <div>
    video-module
    <span>{{params}}</span>
  </div>
</template>

<script>

export default {
  name: 'videoModule',

  data() {
    return {
      params: this.$route.params.id
    };
  }
}

</script>

<style scoped>



</style>