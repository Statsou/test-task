import projectsApi from '@/api/projects.js';

const state = {
  data: null,
  isLoading: false,
  currentProject: null,
  currentDocument: null,
};

export const mutationTypes = {
  getProjectsStart: '[projects] getProjectsStart',
  getProjectsSuccess: '[projects] getProjectsSuccess',
  getProjectsFailure: '[projects] getProjectsFailure',

  getCurrentProjectsStart: '[projects] getCurrentProjectsStart',
  getCurrentProjectsSuccess: '[projects] getCurrentProjectsSuccess',
  getCurrentProjectsFailure: '[projects] getCurrentProjectsFailure',

  getCurrentDocumentStart: '[projects] getCurrentDocument',
  getCurrentDocumentSuccess: '[projects] getCurrentDocumentSuccess',
  getCurrentDocumentFailure: '[projects] getCurrentDocumentFailure',
};

export const getterTypes = {
  projectsList: '[projects] projectsList',
  currentProject: '[projects] currentProject',
  currentDocument: '[projects] currentDocument',
};

export const actionTypes = {
  getProjects: '[projects] getProjects',
  getCurrentProject: '[projects] getCurrentProject',
  getCurrentDocument: '[projects] getCurrentDocument',
};

const mutations = {
  [mutationTypes.getProjectsStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getProjectsSuccess](state, payload) {
    (state.isLoading = false), (state.data = payload);
  },
  [mutationTypes.getProjectsFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.getCurrentProjectsStart]() {},
  [mutationTypes.getCurrentProjectsSuccess](state, payload) {
    state.currentProject = payload;
  },
  [mutationTypes.getCurrentProjectsFailure]() {},

  [mutationTypes.createDocumentStart]() {},
  [mutationTypes.getCurrentDocumentSuccess](state, payload) {
    state.isLoading = false;
    state.currentDocument = payload;
  },
  [mutationTypes.getCurrentDocumentFailure]() {},
};

const getters = {
  [getterTypes.projectsList]: (state) => {
    return state.data;
  },
  [getterTypes.currentProject]: (state) => {
    return state.currentProject;
  },
  [getterTypes.currentDocument]: (state) => {
    return state.currentDocument;
  },
};

const actions = {
  [actionTypes.getProjects](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getProjectsStart, apiUrl);

      if (state.data === null) {
        projectsApi
          .getProjects(apiUrl)
          .then((response) => {
            context.commit(mutationTypes.getProjectsSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            context.commit(mutationTypes.getProjectsFailure);
          });
      } else {
        context.commit(mutationTypes.getProjectsFailure);
      }
    });
  },

  [actionTypes.getCurrentProject](context, currentProject) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentProjectsSuccess, currentProject);
      resolve();
    });
  },

  [actionTypes.getCurrentDocument](context, currentDocument) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentDocumentSuccess, currentDocument);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
