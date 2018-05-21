<template>
  <div id="app" class="uk-container">
    <Menu></Menu>
    <router-view/>
  </div>
</template>

<script>

import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style>

</style>
