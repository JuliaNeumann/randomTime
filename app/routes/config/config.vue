<template>
    <div id="app" class="uk-container">
        <Menu :active="'config'"></Menu>
        <h1 class="uk-heading-divider">Edit your configuration</h1>
        <form class="uk-form-stacked">
            <fieldset class="uk-fieldset uk-margin-large">
                <label class="uk-form-label" for="slot-length">Length of your slots (in hours):</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-form-width-medium" id="slot-length" type="number"
                           v-model="slotLength">
                </div>
            </fieldset>
            <fieldset class="uk-fieldset uk-margin-large">
                <h4>List of Tasks:</h4>
                Add as many activities as you like. Optionally, provide a weight as a fraction of 1 (e.g. 0.5 if you want the activity to fill up approximately 50% of your time slots).
                <section v-for="(activity, index) in activities" class="uk-margin-small">
                    <input class="uk-input uk-form-width-medium" type="text" placeholder="Name your activity"
                           v-model="activity.name">
                    <input class="uk-input uk-form-width-medium" type="number" placeholder="Optional: Weight"
                           v-model="activity.minAmount">
                    <button class="uk-button uk-button-danger uk-button-small"
                            @click.prevent="deleteActivity(index)" title="Delete Activity">
                        <span uk-icon="trash"></span>
                    </button>
                </section>
                <section class="uk-margin">
                    <button class="uk-button uk-button-default"
                            @click.prevent="addActivity">
                        <span uk-icon="plus" class="uk-margin-small-right"></span>Add new activity
                    </button>
                </section>
            </fieldset>
            <label class="uk-form-label uk-margin" for="user">User:</label>
            <div class="uk-form-controls">
                <input class="uk-input uk-form-width-medium" id="user" type="text"
                       v-model="user">
            </div>
            <fieldset class="uk-fieldset uk-margin-large">
                <spinner v-if="loading"></spinner>
                <div class="uk-alert-primary" uk-alert v-if="showSuccess">
                    <p>Successfully created config!</p>
                </div>
                <alerts :message="message" :error="error"></alerts>
                <input type="submit" class="uk-button uk-button-primary uk-margin" value="Submit"
                       @click.prevent="submitConfig">
            </fieldset>
        </form>
    </div>
</template>

<script>
  import Menu from '../main/menu.vue';
  import Spinner from '../main/spinner.vue';
  import Alerts from '../main/alerts.vue';
  import {userMixin} from '../../mixins/user';

  export default {
    name: 'Config',
    mixins: [userMixin],
    components: {
      Menu,
      Spinner,
      Alerts
    },
    data() {
      return {
        slotLength: 0.5,
        activities: [],
        showSuccess: false,
        error: '',
        message: '',
        loading: false
      }
    },
    mounted() {
      if (this.user) {
        axios
          .get('/getConfigForUser', { params: { user: this.user }})
          .then(response => {
            this.slotLength = response.data.slotLength || 0.5;
            this.activities = response.data.activities || [];
          })
      }
    },
    methods: {
      addActivity() {
        this.$set(this.activities, this.activities.length ,{
          name: '',
          minAmount: null
        });
      },
      deleteActivity(index) {
        this.activities.splice(index, 1);
      },
      checkNames() {
        const allActivitiesHaveName = this.activities.every((activity) => {
            return !!activity.name;
        });
        if (!allActivitiesHaveName) {
          this.error = 'You must provide a name for each activity!';
        }
        return allActivitiesHaveName;
      },
      checkTimes() {
        const sumActivities = this.activities.reduce(((total, activity) => {
          if (activity.minAmount && !isNaN(activity.minAmount)) {
            return total + parseFloat(activity.minAmount);
          }
          return total;
        }), 0);
        if (sumActivities > 1) {
          this.error = 'The amounts of all your activities\' weigths together must not be more than 1!';
          return false;
        }
        return true;
      },
      submitConfig() {
        this.loading = true;
        this.error = '';
        this.showSuccess = false;
        this.message = '';

        if (this.checkNames() && this.checkTimes()) {
          axios
            .post('/config', {
              slotLength: this.slotLength,
              activities: this.activities,
              user: this.user
            })
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
        }
      }
    }
  };
</script>

<style scoped>
    .uk-form-width-medium {
        width: 250px;
    }
</style>