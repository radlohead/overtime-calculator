import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timePay: null
  },
  mutations: {
    setState(state, payload) {
      state[payload.type] = payload.data
    }
  }
})

export default store
