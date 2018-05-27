<template>
    <div class="error-page uk-container">
        <h1 class="uk-heading-divider">{{title}}</h1>
        <div v-if="debug">
            <p>Error code: {{errorCode}}</p>
            <p>Traceback:</p>
            <pre>
                {{error}}
            </pre>
        </div>
        <div v-else>
            <p class="uk-text-lead uk-text-warning">The page you're looking for is in another framework</p>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {}
    }
}
</script>

<style lang="css">

</style>
