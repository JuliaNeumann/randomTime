<template>
    <div id="app" class="uk-container">
        <Menu :active="'config'"></Menu>
        <h1 class="uk-heading-divider">Edit your configuration</h1>
        <form class="uk-form-stacked">
            <fieldset class="uk-fieldset">
                <label class="uk-form-label" for="slot-length">Length of your slots (in hours):</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-form-width-medium" id="slot-length" type="number"
                           v-model="config.slotLength">
                </div>
                <h4>List of Tasks:</h4>
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
        config: {},
        showSuccess: false,
        error: ''
      }
    },
    methods: {
      submitConfig() {
        axios
          .post('/config', this.config)
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