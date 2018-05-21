<template>
   <div>
       <h1 class="uk-heading-divider">Create Week Plan</h1>
       <form class="uk-form-stacked">
           <fieldset class="uk-fieldset">
               <label class="uk-form-label" for="number-of-hours">Number of hours to plan:</label>
               <div class="uk-form-controls">
                   <input class="uk-input uk-form-width-medium" id="number-of-hours" type="number"
                          v-model="numHours">
               </div>
               <input type="submit" class="uk-button uk-button-primary uk-margin" value="Create"
                      @click.prevent="submitWeekplan">
           </fieldset>
       </form>
       <div class="uk-alert-primary" uk-alert v-if="showSuccess">
         <a class="uk-alert-close" uk-close></a>
         <p>Created week plan for {{ numHours }} hours!</p>
       </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeekPlan',
  data() {
    return {
      numHours: 0,
      showSuccess: false,
    };
  },
  methods: {
    submitWeekplan() {
      axios
        .get(`http://localhost:3000/weekplan/${this.numHours}`)
        .then(() => {
          // TODO: error handling
          this.showSuccess = true;
        });
    },
  },
};
</script>

<style scoped>

</style>
