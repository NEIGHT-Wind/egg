<template>
  <div>
    photo-module
    <span>{{params}}</span>
  </div>
</template>

<script>

export default {
  name: 'photoModule',

  data() {
    return {
      params: this.$route.params.id
    };
  },

  watch: {
    '$route'() {
      this.init();
    }
  },

  create() {
    this.init();
  },

  methods: {
    init() {
      this.params = this.$route.params.id;
    }
  }
}

</script>

<style scoped>



</style>