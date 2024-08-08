<template>
  <form class="form" @submit.prevent="onSubmit">
    <fieldset class="form__group">
      <input
        class="form__control"
        type="text"
        placeholder="Название проекта"
        v-model="title"
        v-autofocus
        required
      />
    </fieldset>

    <fieldset class="form__group">
      <textarea
        class="form__control"
        placeholder="Описание проекта"
        rows="4"
        v-model="description"
        required
      >
      </textarea>
    </fieldset>
    <button
      class="form__submit button-primary"
      type="submit"
      :disabled="isSubmitting"
    >
      Сохранить
    </button>
  </form>
</template>

<script>
export default {
  name: 'TProjectForm',
  props: {
    initialValue: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: this.initialValue.title,
      description: this.initialValue.description,
    };
  },
  directives: {
    autofocus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
      };
      this.$emit('projectSubmit', form);
    },
  },
};
</script>
