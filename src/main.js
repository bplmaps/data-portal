// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import InstantSearch from 'vue-instantsearch'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(InstantSearch)

new Vue({
  el: "#app",
  data: {
    "viewComplexityMode": "simple"
  },
  router,
  render: (h)=>h(App)
});
