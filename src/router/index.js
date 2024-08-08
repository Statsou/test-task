import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

import Projects from '@/views/Projects.vue';
import EditProject from '@/views/EditProject.vue';
import CreateProject from '@/views/CreateProject.vue';

import ProjectDocuments from '@/views/ProjectDocuments.vue';
import EditDocument from '@/views/EditDocument.vue';
import CreateDocument from '@/views/CreateDocument.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/projects/:slug/edit',
    name: 'editProject',
    component: EditProject
  },
  {
    path: '/projects/new',
    name: 'createProject',
    component: CreateProject
  },

  {
    path: '/projects/:slug',
    name: 'projectDocuments',
    component: ProjectDocuments
  },
  {
    path: '/documents/:slug/edit',
    name: 'editDocument',
    component: EditDocument
  },
  {
    path: '/projects/:slug/new',
    name: 'createDocument',
    component: CreateDocument
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
