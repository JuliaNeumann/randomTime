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
                    <input type="submit" class="uk-button uk-button-primary uk-margin" value="Create"
                           @click.prevent="submitWeekplan">
                </fieldset>
            </form>
            <div class="uk-alert-primary" uk-alert v-if="showSuccess">
                <a class="uk-alert-close" uk-close></a>
                <p>Created week plan for {{ numHours }} hours!</p>
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

  export default {
    name: 'WeekPlan',
    components: {
      Menu,
    },
    data() {
      return {
        numHours: 0,
        showSuccess: false,
        error: ''
      };
    },
    methods: {
      submitWeekplan() {
        const postData = {
          hours: this.numHours
        };

        axios
          .post('/weekplan', postData)
          .then(result => {
            this.showSuccess = true;
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
