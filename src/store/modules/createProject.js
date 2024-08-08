const state = {
  isSubmitting: false
}

export const mutationTypes = {
  createProjectStart: '[createProject] createProjectStart',
  createProjectSuccess: '[createProject] createProjectSuccess',
  createProjectFailure: '[createProject] createProjectFailure'
}

export const actionTypes = {
  createProject: '[createProject] createProject',
}

const mutations = {
  [mutationTypes.createProjectStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createProjectSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createProjectFailure](state) {
    state.isSubmitting = false
  }
}

const actions = {
  [actionTypes.createProject](context, newProject) {
    return new Promise (resolve => {
      context.commit(mutationTypes.createProjectStart)
      if (newProject) {
        context.commit(mutationTypes.createProjectSuccess, newProject)
        resolve()
      } else {
        context.commit(mutationTypes.createProjectFailure)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
