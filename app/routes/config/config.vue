<template>
    <div id="app" class="uk-container">
        <Menu :active="'config'"></Menu>
    </div>
</template>

<script>
  import Menu from '../main/menu.vue';

  export default {
    name: 'Config',
    components: {
      Menu,
    },
    data() {
      return {}
    }
  };
</script>