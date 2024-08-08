<template>
  <section class="projects">
    <h2 class="projects__title">Мои проекты</h2>
    <router-link
      class="projects__create-link button-secondary"
      :to="{name: 'createProject'}"
      >Новый проект</router-link
    >
    <div v-if="isLoading">Загружаем проекты...</div>
    <div v-if="!isLoading && projectLength === 0">Проектов нет</div>
    <ul class="projects__list" v-if="projects">
      <li
        class="projects__item"
        v-for="(project, index) in projects.projects"
        :key="index"
      >
        <router-link
          class="projects__link content"
          :to="{name: 'projectDocuments', params: {slug: project.slug}}"
        >
          <h3 class="content__title">{{ project.title }}</h3>
          <p class="content__description">{{ project.description }}</p>
          <span class="content__date">{{ project.date }}</span>
        </router-link>
        <t-menu-item
          class="projects__menu"
          :modificator="'projects'"
          @onDeleteItem="deleteItem(index)"
          :nameLink="'editProject'"
          :slug="project.slug"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import {actionTypes, getterTypes} from '@/store/modules/projects';
import {mapState, mapGetters} from 'vuex';
import TMenuItem from '@/components/MenuItem.vue';

export default {
  name: 'TProject',
  components: {
    TMenuItem,
  },
  computed: {
    ...mapState({
      projects: (state) => state.projects.data,
      isLoading: (state) => state.projects.isLoading,
    }),
    ...mapGetters({
      projectList: getterTypes.projectsList,
    }),
    projectLength() {
      return this.projects !== null ? this.projectList?.projects?.length : 0;
    },
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      this.$store.dispatch(actionTypes.getProjects, {apiUrl: '/projects'});
    },
    deleteItem(index) {
      const result = confirm('Вы действительно хотите удалить проект?');
      if (result) {
        this.projectList.projects.splice(index, 1);
      }
    },
  },
};
</script>
