<template>
  <section class="create-project">
    <h2 class="create-project__title">Новый Проект</h2>
    <div class="create-project__navigation">
      <t-button-back @router="router" />
    </div>
    <t-project-form
      :initial-value="initialValues"
      :is-submitting="isSubmitting"
      @projectSubmit="onSubmit"
    />
  </section>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {getterTypes, actionTypes} from '@/store/modules/projects';
import {actionTypesCreateProject} from '@/store/modules/createProject';
import {generateRandomString} from '@/helpers/generateRandomString.js';
import {getDate} from '@/helpers/getDate.js';

import TProjectForm from '@/components/ProjectForm.vue';
import TButtonBack from '@/components/ButtonBack.vue';

export default {
  name: 'TCreateProject',
  components: {
    TProjectForm,
    TButtonBack,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createProject.isSubmitting,
    }),
    ...mapGetters({
      projectsList: getterTypes.projectsList,
    }),
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
      },
    };
  },
  beforeMount() {
    if (!this.projectsList) {
      this.updatePage();
    }
  },
  methods: {
    onSubmit(projectInput) {
      projectInput.date = getDate();
      projectInput.slug = generateRandomString();
      projectInput.documents = [];
      this.projectsList.projects.unshift(projectInput);

      this.$store
        .dispatch(actionTypesCreateProject.createProject, projectInput)
        .then(() => {
          this.$router.push({name: 'projects'});
        });
    },
    router() {
      this.$router.push({name: 'projects'});
    },
    updatePage() {
      this.$store.dispatch(actionTypes.getProjects, {apiUrl: '/projects'});
    },
  },
};
</script>
