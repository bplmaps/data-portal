<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="~/assets/lmec-logo.png" alt="LMEC Logo">
      </div>
      <div class="navbar-item is-size-4">
        <router-link to="/">
        Public Data Portal
        </router-link>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <a href="">Documentation</a>
        </div>
        <div class="navbar-item">
          <a href="">Get Help</a>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-primary">
                <select name="" id="" v-model="selectedView">
                  <option value="simple">Simple view</option>
                  <option value="extended">Extended view</option>
                  <option value="tutorial">Tutorial view</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <font-awesome-icon :icon="selectedViewIcon"></font-awesome-icon>
              </div>
            </div>
          </div>
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
      selectedView: 'simple'
    }
  },
  computed: {
    selectedViewIcon: function() {
      if(this.selectedView === 'simple') { return 'th-large' }
      else if(this.selectedView === 'extended') { return "th" }
      else if(this.selectedView === 'tutorial') { return "chalkboard-teacher" } 
    }
  }
}
</script>

<style scoped>


</style>
