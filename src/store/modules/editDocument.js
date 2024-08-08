const state = {
  isSubmitting: false,
};

export const mutationTypes = {
  editDocumentStart: '[editDocument] editDocumentStart',
  editDocumentSuccess: '[editDocument] editDocumentSuccess',
  editDocumentFailure: '[editDocument] editDocumentFailure',
};

export const actionTypesEditDocument = {
  editDocument: '[editDocument] editDocument',
};

const mutations = {
  [mutationTypes.editDocumentStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.editDocumentSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.editDocumentFailure](state) {
    state.isSubmitting = false;
  },
};

const actions = {
  [actionTypesEditDocument.editDocument](context, editDocument) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editDocumentStart);
      if (editDocument) {
        context.commit(mutationTypes.editDocumentSuccess);
        resolve();
      } else {
        context.commit(mutationTypes.editDocumentFailure);
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
