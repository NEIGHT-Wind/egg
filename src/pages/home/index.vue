<template>
  <div>
    <span>{{title}}</span>
  </div>
</template>

<script>

import { navMenuConfig } from '@/config';

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

