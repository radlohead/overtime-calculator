import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(plugin)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.filter('numberWithCommas', value =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
