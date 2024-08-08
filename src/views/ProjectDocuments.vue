<template>
  <section class="project" v-if="currentProject">
    <h2 class="project__title">{{ currentProject.title }}</h2>
    <p class="project__description">{{ currentProject.description }}</p>
    <div class="project__navigation">
      <t-button-back @router="router" />
      <router-link
        class="project__link button-secondary"
        :to="{name: 'createDocument'}"
        >Новый документ</router-link
      >
    </div>
    <span class="visually-hidden">Вложенные документы</span>
    <div class="project__container-empty" v-if="documentsLength === 0">
      Документов нет
    </div>
    <draggable
      class="project__list"
      v-model="currentProject.documents"
      tag="ul"
      :animation="300"
      :item-key="(item) => currentProject.documents.indexOf(item)"
    >
      <template #item="{element: document, index}">
        <li class="project__item document" :key="index">
          <h3 class="document__title">{{ document.title }}</h3>
          <p class="document__content">{{ document.content }}</p>
          <t-menu-item
            class="document__menu"
            :modificator="'document'"
            @onDeleteItem="deleteItem(index)"
            :nameLink="'editDocument'"
            :slug="document.slug"
          />
        </li>
      </template>
    </draggable>
  </section>
  <div v-else>
    Что-то пошло не так, вернитесь на главную и обновите страницу
  </div>
</template>

<script>
import {getterTypes, actionTypes} from '@/store/modules/projects';
import {mapGetters, mapState} from 'vuex';
import draggable from 'vuedraggable';
import TButtonBack from '@/components/ButtonBack.vue';
import TMenuItem from '@/components/MenuItem.vue';

export default {
  name: 'TProjectDocuments',
  components: {
    TButtonBack,
    draggable,
    TMenuItem,
  },
  computed: {
    ...mapState({
      currentProject: (state) => state.projects.currentProject,
    }),
    ...mapGetters({
      projectList: getterTypes.projectsList,
    }),
    documentsLength() {
      return this.currentProject?.documents?.length;
    },
  },
  beforeMount() {
    if (this.projectList) {
      const currentProject = this.projectList?.projects?.find(
        (project) => project.slug === this.$route.params.slug
      );
      this.$store.dispatch(actionTypes.getCurrentProject, currentProject);
      localStorage.setItem(
        'currentProject',
        JSON.stringify(this.currentProject)
      );
    } else {
      this.$store.dispatch(actionTypes.getProjects, {apiUrl: '/projects'});
      const currentProject = JSON.parse(localStorage.getItem('currentProject'));
      this.$store.dispatch(actionTypes.getCurrentProject, currentProject);
      alert('Данные изменились на изначальные. Изменения не будут внесены.');
    }
  },
  methods: {
    deleteItem(index) {
      const result = confirm('Вы действительно хотите удалить документ?');
      if (result) {
        this.currentProject.documents.splice(index, 1);
      }
    },
    router() {
      this.$router.push({name: 'projects'});
    },
  },
};
</script>
