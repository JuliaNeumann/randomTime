<template>
    <div>
        <div class="uk-alert-warning" uk-alert v-if="message">
            <p>{{ message }}</p>
        </div>
        <div class="uk-alert-danger" uk-alert v-if="error">
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Alerts",
    props: {
      message: {
        type: String,
        default: ''
      },
      error: {
        type: String,
        default: ''
      }
    }
  }
</script>