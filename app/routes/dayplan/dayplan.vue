<template>
    <div id="app" class="uk-container">
        <Menu :active="'dayplan'"></Menu>
        <div>
            <h1 class="uk-heading-divider">Get Day Plan</h1>
            <form class="uk-form-stacked">
                <fieldset class="uk-fieldset">
                    <label class="uk-form-label" for="number-of-hours">Number of hours to plan:</label>
                    <div class="uk-form-controls">
                        <input class="uk-input uk-form-width-medium" id="number-of-hours" type="number"
                               v-model="numHours">
                    </div>
                    <label class="uk-form-label uk-margin" for="user">User:</label>
                    <div class="uk-form-controls">
                        <input class="uk-input uk-form-width-medium" id="user" type="text"
                               v-model="user">
                    </div>
                    <input type="submit" class="uk-button uk-button-primary uk-margin" value="Get"
                           @click.prevent="submitDayplan">
                </fieldset>
            </form>
            <h2 class="uk-heading-divider" v-if="tasks.length > 0">Tasks for Today:</h2>
            <ul class="uk-list uk-list-striped" v-if="tasks.length > 0">
                <li v-for="(task, index) in tasks" :key="index">{{ slotLength }}h: {{ task }}</li>
            </ul>
            <div class="uk-alert-warning" uk-alert v-if="message">
                <a class="uk-alert-close" uk-close></a>
                <p>{{ message }}</p>
            </div>
            <div class="uk-alert-danger" uk-alert v-if="error">
                <a class="uk-alert-close" uk-close></a>
                <p>{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import Menu from '../main/menu.vue';
  import {userMixin} from '../../mixins/user';

  export default {
    name: 'DayPlan',
    mixins: [userMixin],
    components: {
      Menu,
    },
    data() {
      return {
        numHours: 0,
        tasks: [],
        message: '',
        error: '',
        slotLength: 0.5,
        user: ''
      };
    },
    methods: {
      submitDayplan() {

        const postData = {
            hours: this.numHours,
            user: this.user
        };

        axios
          .post('/dayplan', postData)
          .then((response) => {
            if (typeof response.data.message === 'string') {
              this.message = response.data.message;
              this.tasks = [];
            } else {
              this.tasks = response.data.tasks;
              this.message = '';
            }
          })
          .catch(error => {
            this.error = error.data;
          });
      },
    },
  };
</script>

<style scoped>

</style>
