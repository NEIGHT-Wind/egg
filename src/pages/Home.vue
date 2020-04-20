<template>
  <div>
    <span>{{title}}</span>
  </div>
</template>

<script>

import { navMenuConfig } from '../config/index';

export default {
  name: 'Home',

  data() {
    return {
      navMenuConfig,
      title: '123'
    }
  }
}

</script>

