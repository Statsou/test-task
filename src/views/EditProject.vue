<template>
  <section class="edit-project" v-if="currentProject">
    <h2 class="edit-project__title">Редактировать Проект</h2>
    <div class="edit-project__navigation">
      <t-button-back @router="router"/>
    </div>
    <t-project-form
      :initial-value="initialValues"
      :is-submitting="isSubmitting"
      @projectSubmit="onSubmit"
    />
  </section>
  <div v-else>
    Что-то пошло не так
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getterTypes, actionTypes } from '@/store/modules/projects';
import { actionTypesEditProject } from '@/store/modules/editProject'
import TProjectForm from '@/components/ProjectForm.vue';
import TButtonBack from '@/components/ButtonBack.vue';

export default {
  name: 'TEditProject',
  components: {
    TProjectForm,
    TButtonBack
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editProject.isSubmitting,
      currentProject: state => state.projects.currentProject
    }),
    ...mapGetters({
      currentProject: getterTypes.currentProject,
      projectList: getterTypes.projectsList
    }),
    initialValues() {
      if (!this.currentProject) {
        return null
      }

      return {
        title: this.currentProject.title,
        description: this.currentProject.description
      }
    }
  },
  beforeMount() {
    const currentProject = this.projectList?.projects?.find(project => project.slug === this.$route.params.slug)
    this.$store.dispatch(actionTypes.getCurrentProject, currentProject)

    if (!this.currentProject) {
      alert("Изменения отменены. Вас перенаправит на главную страницу")
      this.$router.push({name: 'projects'})
    }
  },
  methods: {
    onSubmit(projectInput) {
      this.currentProject.title = projectInput.title
      this.currentProject.description = projectInput.description
      this.$store.dispatch(actionTypesEditProject.editProject, projectInput)
        .then(() => {
          this.$router.push({name: 'projects'})
        })
    },
    router() {
      this.$router.push({name: 'projects'})
    }
  }
}
</script>
