<template>
    <div class="uk-margin">
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-right">

                <ul class="uk-navbar-nav">
                    <li :class="this.active === 'weekplan' ? 'uk-active' : ''"><a href="/weekplan">Create Week Plan</a></li>
                    <li :class="this.active === 'dayplan' ? 'uk-active' : ''"><a href="/dayplan">Get Day Plan</a></li>
                </ul>

            </div>
        </nav>
    </div>
</template>

<script>
  export default {
    name: 'Menu',
    props: {
      active: ''
    }
  };
</script>