<template>
  <div class="uk-margin">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-right">

        <ul class="uk-navbar-nav">
          <li><router-link to="weekplan">Create Week Plan</router-link></li>
          <li><router-link to="dayplan">Get Day Plan</router-link></li>
        </ul>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
