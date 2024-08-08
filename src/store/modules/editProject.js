const state = {
  isSubmitting: false
}

export const mutationTypes = {
  editProjectStart: '[editProject] editProjectStart',
  editProjectSuccess: '[editProject] editProjectSuccess',
  editProjectFailure: '[editProject] editProjectFailure',
}

export const actionTypesEditProject = {
  editProject: '[editProject]editProject',
}

const mutations = {
  [mutationTypes.editProjectStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editProjectSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editProjectFailure](state) {
    state.isSubmitting = false
  }
}

const actions = {
  [actionTypesEditProject.editProject](context, editProject) {
    return new Promise (resolve => {
      context.commit(mutationTypes.editProjectStart)
      if (editProject) {
        context.commit(mutationTypes.editProjectSuccess)
        resolve()
      } else {
        context.commit(mutationTypes.editProjectFailure)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}


