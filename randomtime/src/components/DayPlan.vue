<template>
    <div>
        <h1 class="uk-heading-divider">Get Day Plan</h1>
        <form class="uk-form-stacked">
            <fieldset class="uk-fieldset">
                <label class="uk-form-label" for="number-of-slots">Number of slots to plan:</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-form-width-medium" id="number-of-slots" type="number"
                           v-model="numSlots">
                </div>
                <input type="submit" class="uk-button uk-button-primary uk-margin" value="Get"
                       @click.prevent="submitDayplan">
            </fieldset>
        </form>
        <h2 class="uk-heading-divider" v-if="tasks.length > 0">Tasks for Today:</h2>
        <ul class="uk-list uk-list-striped" v-if="tasks.length > 0">
          <li v-for="(task, index) in tasks" :key="index">0.5: {{ task }}</li>
        </ul>
      <div class="uk-alert-warning" uk-alert v-if="message">
        <a class="uk-alert-close" uk-close></a>
        <p>{{ message }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DayPlan',
  data() {
    return {
      numSlots: 0,
      tasks: [],
      message: '',
    };
  },
  methods: {
    submitDayplan() {
      axios
        .get(`http://localhost:3000/dayplan/${this.numSlots}`)
        .then((response) => {
          // TODO: error handling
          if (typeof response.data === 'string') {
            this.message = response.data;
            this.tasks = [];
          } else {
            this.tasks = response.data;
            this.message = '';
          }
        });
    },
  },
};
</script>

<style scoped>

</style>
