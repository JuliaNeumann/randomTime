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
                <section v-for="(activity, index) in activities" class="uk-margin-small">
                    <input class="uk-input uk-form-width-medium" type="text" placeholder="Name your activity"
                           v-model="activity.name">
                    <input class="uk-input uk-form-width-medium" type="number" placeholder="Optional: Time in %"
                           v-model="activity.minAmount">
                    <button class="uk-button uk-button-danger uk-button-small"
                            @click.prevent="deleteActivity(index)" title="Delete Activity">
                        <span uk-icon="trash"></span>
                    </button>
                </section>
                <button class="uk-button uk-button-default uk-margin"
                        @click.prevent="addActivity">
                    <span uk-icon="plus" class="uk-margin-small-right"></span>Add new activity
                </button>
            </fieldset>
            <fieldset class="uk-fieldset uk-margin-large">
                <input type="submit" class="uk-button uk-button-primary uk-margin" value="Submit"
                       @click.prevent="submitConfig">
            </fieldset>
        </form>
        <div class="uk-alert-primary" uk-alert v-if="showSuccess">
            <a class="uk-alert-close" uk-close></a>
            <p>Successfully created config!</p>
        </div>
        <div class="uk-alert-danger" uk-alert v-if="error">
            <a class="uk-alert-close" uk-close></a>
            <p>{{ error }}</p>
        </div>
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
      return {
        slotLength: 0.5,
        activities: [],
        showSuccess: false,
        error: ''
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
      submitConfig() {
        //TODO: check that each activity has at least a name
        //TODO: add check for amounts not more than 100% together
        axios
          .post('/config', {
            slotLength: this.slotLength,
            activities: this.activities
          })
          .then(result => {
            this.showSuccess = true;
          })
          .catch(error => {
            this.error = error.data;
          })
      }
    }
  };
</script>