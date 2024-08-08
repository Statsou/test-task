import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoggedIn: false
}

export const mutationTypes = {
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  logout: '[auth] logout'
}

export const actionTypes = {
  login: '[auth] login',
  logout: '[auth] logout'
}

export const getterTypes = {
  isLoggedIn: '[auth] isLoggedIn'
}

const getters = {
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  }
}

const mutations = {
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.loginSuccess](state) {
    state.isSubmitting = false,
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state) {
    state.isSubmitting = false
  },

  [mutationTypes.logout](state) {
    state.isLoggedIn = false
  }
}

const actions = {
  [actionTypes.login](context) {
    return new Promise ((resolve) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login()
        .then(response => {
          context.commit(mutationTypes.loginSuccess)
          setItem('accessToken', response.data.token)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.loginFailure)
        })
    })
  },

  [actionTypes.logout](context) {
    return new Promise (resolve => {
      localStorage.removeItem('accessToken');
      context.commit(mutationTypes.logout)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
