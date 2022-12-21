import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar:{
      show: false
    }
  },
  getters: {
  },
  mutations: {
    showSnackbar(state){
      state.snackbar.show = true
    }
  },
  actions: {
  },
  modules: {
  }
})
