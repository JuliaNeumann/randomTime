<template>
    <div id="app" class="uk-container">
        <Menu :active="'weekplan'"></Menu>
        <div>
            <h1 class="uk-heading-divider">Create Week Plan</h1>
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
                    <input type="submit" class="uk-button uk-button-primary uk-margin" value="Create"
                           @click.prevent="submitWeekplan">
                </fieldset>
            </form>
            <spinner v-if="loading"></spinner>
            <div class="uk-alert-primary" uk-alert v-if="showSuccess">
                <p>Created week plan for {{ numHours }} hours!</p>
            </div>
            <alerts :message="message" :error="error"></alerts>
        </div>
    </div>
</template>

<script>
  import Menu from '../main/menu.vue';
  import Spinner from '../main/spinner.vue';
  import Alerts from '../main/alerts.vue';
  import {userMixin} from '../../mixins/user';

  export default {
    name: 'WeekPlan',
    mixins: [userMixin],
    components: {
      Menu,
      Spinner,
      Alerts
    },
    data() {
      return {
        numHours: 0,
        showSuccess: false,
        error: '',
        message: '',
        loading: false
      };
    },
    methods: {
      submitWeekplan() {
        this.loading = true;
        this.error = '';
        this.message = '';
        this.showSuccess = false;

        const postData = {
          hours: this.numHours,
          user: this.user
        };

        axios
          .post('/weekplan', postData)
          .then(response => {
            this.loading = false;

            if (typeof response.data.message === 'string') {
              this.message = response.data.message;
            } else if (response.data.success) {
              this.showSuccess = true;
            }
          })
          .catch(error => {
            this.error = error.data;
          })
      },
    },
  };
</script>

<style scoped>

</style>
