<template>
    <div id="app" class="uk-container">
        <Menu></Menu>
        <h1 class="uk-heading-divider">Welcome to Random Time!</h1>
        <p class="uk-text-lead">Select from the menu above what you want to do.</p>
    </div>
</template>

<script>

  import Menu from './menu.vue';

  export default {
    name: 'App',
    components: {
      Menu,
    },
  };

</script>
