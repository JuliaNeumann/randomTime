<template>
   <div>
       <h1 class="uk-heading-divider">Create Week Plan</h1>
       <form class="uk-form-stacked">
           <fieldset class="uk-fieldset">
               <label class="uk-form-label" for="number-of-hours">Number of hours to plan:</label>
               <div class="uk-form-controls">
                   <input class="uk-input uk-form-width-medium" id="number-of-hours" type="number">
               </div>
               <input type="submit" class="uk-button uk-button-primary uk-margin" value="Create">
           </fieldset>
       </form>
   </div>
</template>

<script>

const randomTime = require("./../randomTime");

export default {
  name: 'WeekPlan',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>

</style>
