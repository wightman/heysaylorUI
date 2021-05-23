import Vue from 'vue'

const state = {
  signedIn: false,
  user: {
    userName: "", 
    userId: -1, 
    userEmail: ""
  }
 }

const getters = {
  user(context) {
    return context.user
  },
  signedIn(context) {
    return context.signedIn
  },
}

const actions = {
  setUser(store, user) {
    store.commit('SET_USER', user);
  },

  setSignedIn(store, signedIn) {
    store.commit('SET_SIGNED_IN', signedIn);
  },
}

const mutations = {
  SET_USER(context, user) {
    Vue.set(context, 'user', user)
  },
  SET_SIGNED_IN(context, signedIn) {
    Vue.set(context, 'signedIn', signedIn)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}