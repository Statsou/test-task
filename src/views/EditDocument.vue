<template>
  <section class="edit-document">
    <h2 class="edit-document__title">Редактировать Документ</h2>
    <div class="edit-document__navigation">
      <t-button-back @router="router" />
    </div>
    <t-document-form
      :initial-value="initialValues"
      :is-submitting="isSubmitting"
      @documentSubmit="onSubmit"
    />
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getterTypes, actionTypes } from '@/store/modules/projects';
import { actionTypesEditDocument } from '@/store/modules/editDocument';

import TDocumentForm from '@/components/DocumentForm.vue';
import TButtonBack from '@/components/ButtonBack.vue';

export default {
  name: 'TEditDocument',
  components: {
    TDocumentForm,
    TButtonBack
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editDocument.isSubmitting,
      currentProject: state => state.projects.currentProject,
      currentDocument: state => state.projects.currentDocument
    }),
    ...mapGetters({
      currentProject: getterTypes.currentProject,
      projectList: getterTypes.projectsList,
      currentDocument: getterTypes.currentDocument
    }),
    initialValues() {
      if (!this.currentDocument) {
        return null
      }

      return {
        title: this.currentDocument.title,
        content: this.currentDocument.content
      }
    }
  },
  beforeMount() {
    const currentDocument = this.currentProject.documents.find(project => project.slug === this.$route.params.slug)
    this.$store.dispatch(actionTypes.getCurrentDocument, currentDocument)
  },
  methods: {
    onSubmit(documentInput) {
      this.currentDocument.title = documentInput.title
      this.currentDocument.content = documentInput.content
      this.$store.dispatch(actionTypesEditDocument.editDocument, documentInput)
        .then(() => {
          this.$router.go(-1)
        })
    },
    router() {
      this.$router.go(-1)
    }

  }
}
</script>
