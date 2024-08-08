<template>
  <section class="project">
    <h2 class="project__title">{{ currentProject.title }}</h2>
    <p class="project__description">{{ currentProject.description }}</p>
    <div class="project__navigation">
      <t-button-back @router="router"/>
      <router-link class="project__link button-secondary" :to="{name: 'createDocument'}">Новый документ</router-link>
    </div>
    <span class="visually-hidden">Вложенные документы</span>
    <div class="project__container-empty" v-if="documentsLength === 0">
      Документов нет
    </div>
    <draggable class="project__list" v-model="currentProject.documents" tag="ul" :animation="300" :item-key="((item) => currentProject.documents.indexOf(item))">
      <template #item="{ element: document, index }">
        <li class="project__item document" :key="index">
          <h3 class="document__title">{{ document.title }}</h3>
          <p class="document__content">{{ document.content }}</p>
          <div class="document__menu">
            <router-link class="document__link" :to="{name: 'editDocument', params: {slug: document.slug}}">
              <span class="visually-hidden">Редактировать</span>
              <svg class="document__icon-edit" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                <path d="M11.43 2.29h-8a2.28 2.28 0 0 0-2.29 2.28v16a2.28 2.28 0 0 0 2.3 2.29h16a2.28 2.28 0 0 0 2.27-2.3v-7.99m-3-10.71a2.43 2.43 0 0 1 3.43 3.43l-10.3 10.3c-.27.27-.6.47-.97.57l-3.29.96c-.2.05-.4 0-.55-.15a.55.55 0 0 1-.15-.55l.96-3.29c.1-.37.3-.7.57-.97Zm0 0" fill="none" stroke-width="2" transform="scale(.41667)"/>
              </svg>
            </router-link>
            <button class="document__button-delete" @click="deleteItem(index)">
              <span class="visually-hidden">Удалить</span>
              <svg class="document__icon-trash" xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 10">
                <path d="M1.75 6.5h22.5M21.75 6.5V24c0 1.25-1.25 2.5-2.5 2.5H6.75c-1.25 0-2.5-1.25-2.5-2.5V6.5M8 6.5V4c0-1.25 1.25-2.5 2.5-2.5h5C16.75 1.5 18 2.75 18 4v2.5M10.5 12.75v7.5M15.5 12.75v7.5" fill="none" stroke-width="2" transform="scale(.38461 .35714)"/>
              </svg>
            </button>
          </div>
        </li>
      </template>
    </draggable>
  </section>
</template>

<script>
import TButtonBack from '@/components/ButtonBack.vue';
import { getterTypes, actionTypes } from '@/store/modules/projects';
import { mapGetters, mapState } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'TProjectDocuments',
  components: {
    TButtonBack,
    draggable
  },
  computed: {
    ...mapState({
      currentProject: state => state.projects.currentProject
    }),
    ...mapGetters({
      projectList: getterTypes.projectsList
    }),
    documentsLength() {
      return this.currentProject.documents.length
    }
  },
  beforeMount() {
    const currentProject = this.projectList.projects.find(project => project.slug === this.$route.params.slug)
    this.$store.dispatch(actionTypes.getCurrentProject, currentProject)
  },
  methods: {
    deleteItem(index) {
      const result = confirm("Вы действительно хотите удалить документ?");
      if (result) {
        this.currentProject.documents.splice(index, 1)
      }
    },
    router() {
      this.$router.push({name: 'projects'})
    }
  }
}
</script>
