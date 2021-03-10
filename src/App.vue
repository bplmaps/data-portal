<template>
  <div id="app">
    <alert-banner>🏋️‍♀️ We're currently working on this portal. See something broken? <a href="https://www.leventhalmap.org/about/contact-connect/">Please let us know!</a></alert-banner>
    <navbar></navbar>
    <router-view/>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import AlertBanner from './components/AlertBanner.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    AlertBanner
  }
}
</script>

<style>

@import "./base-styles.scss";

</style>
