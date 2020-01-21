import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: ''
  },
  mutations: {
    setRole(state, role) {
      state.role = role
    }
  },
  actions: {},
  modules: {}
})
