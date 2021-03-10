<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="https://leventhalmap.org">
        <img src="~/assets/lmec-logo.png" alt="Leventhal Map and Education Center Logo">
        </a>
      
      <div class="navbar-item is-size-4">
        <router-link to="/">
        Data Portal
        </router-link>
      </div>

      <div class="navbar-item">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-primary">
                <select name="" id="" v-model="$root.$data.viewComplexityMode">
                  <option value="simple">Simple view</option>
                  <option value="extended">Extended view</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <font-awesome-icon :icon="selectedViewIcon"></font-awesome-icon>
              </div>
            </div>
          </div>
        </div>

      <a role="button" @click="navbarToggled = !navbarToggled" :class="navbarToggled ? 'is-active': ''" class="navbar-burger" aria-label="menu" aria-expanded="false">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
      </a>


    </div>

    <div class="navbar-menu" :class="navbarToggled ? 'is-active' : ''">
      <div class="navbar-start">
        <div class="navbar-item">
          <a href="https://geoservices.leventhalmap.org/cartinal">Documentation</a>
        </div>
        <div class="navbar-item">
          <a href="https://www.leventhalmap.org/research/geospatial/">Ask a Librarian</a>
        </div>
      </div>

    </div>
  </nav>


</template>

<script>


export default {
  name: 'Navbar',
  data () {
    return {
      selectedView: 'simple',
      navbarToggled: false,
    }
  },
  computed: {
    selectedViewIcon: function() {
      if(this.$root.$data.viewComplexityMode === 'simple') { return 'th-large' }
      else if(this.$root.$data.viewComplexityMode === 'extended') { return "th" }
      else if(this.$root.$data.viewComplexityMode === 'tutorial') { return "chalkboard-teacher" } 
    }
  },


}
</script>

<style lang="scss" scoped>

@import "~/style-vars.scss";

.navbar {
  background: none;
}

.select select {
  background: none;
  border: 0;
  box-shadow: 0px 0px 2px 1px rgba($link, 0.3);
}

</style>
