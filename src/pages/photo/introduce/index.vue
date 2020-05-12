<template>
  <div>
    photo-introduce
    <el-button
      type="primary"
      @click="linkTo"
    >Edit module</el-button>
  </div>
</template>

<script>

export default {
  name: 'photoIntroduce',

  methods: {
    linkTo() {
      this.$router.push({
        name: 'editModule',
        params: { id: 'photo' }
      });
    }
  }
}

</script>

<style scoped>



</style>