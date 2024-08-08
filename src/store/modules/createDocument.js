const state = {
  isSubmitting: false
}

export const mutationTypes = {
  createDocumentStart: '[createDocument] createDocumentStart',
  createDocumentSuccess: '[createDocument] createDocumentSuccess',
  createDocumentFailure: '[createDocument] createDocumentFailure'
}

export const actionTypes = {
  createDocuments: '[createDocument] createDocuments'
}

const mutations = {
  [mutationTypes.createDocumentStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createDocumentSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createDocumentFailure](state) {
    state.isSubmitting = false
  }
}

const actions = {
  [actionTypes.createDocuments](context, newDocument) {
    return new Promise (resolve => {
      context.commit(mutationTypes.createDocumentStart)

      if (newDocument) {
        context.commit(mutationTypes.createDocumentSuccess, newDocument)
        resolve()
      } else {
        context.commit(mutationTypes.createDocumentFailure)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
