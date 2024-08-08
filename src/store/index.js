import { createStore } from 'vuex';
import auth from '@/store/modules/auth.js';

import projects from '@/store/modules/projects.js';
import createProject from '@/store/modules/createProject.js';
import editProject from '@/store/modules/editProject.js';

import createDocument from '@/store/modules/createDocument.js';
import editDocument from '@/store/modules/editDocument.js';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    projects,
    createProject,
    editProject,
    createDocument,
    editDocument
  }
})
