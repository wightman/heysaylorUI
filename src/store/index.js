import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user' 

/* 
 * Like Vue components, things need to be imported (above)
 * and declared (attached) as a module (below)
 */ 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
