<template>
  <section class="create-document">
    <h2 class="create-document__title">Новый документ</h2>
    <div class="create-document__navigation">
      <t-button-back @router="router"/>
    </div>
    <t-document-form
      :initial-value="initialValues"
      :is-submitting="isSubmitting"
      @documentSubmit="onSubmit"
    />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/projects';
import { actionTypes } from '@/store/modules/createDocument';
import { generateRandomString } from '@/helpers/generateRandomString.js';

import TButtonBack from '@/components/ButtonBack.vue';
import TDocumentForm from '@/components/DocumentForm.vue';

export default {
  name: 'TCreateDocument',
  components: {
    TDocumentForm,
    TButtonBack
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createDocument.isSubmitting,
    }),
    ...mapGetters({
      currentProject: getterTypes.currentProject
    })
  },
  data() {
    return {
      initialValues: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    onSubmit(documentInput) {
      documentInput.slug = generateRandomString()
      this.currentProject.documents.push(documentInput)
      this.$store.dispatch(actionTypes.createDocuments, documentInput)
        .then(() => {
          this.$router.push({name: 'projectDocuments'})
        })
    },
    router() {
      this.$router.push({name: 'projectDocuments'})
    }
  }
}
</script>
