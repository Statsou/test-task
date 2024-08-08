<template>
  <section class="login">
    <h2 class="login__title">Вход</h2>
    <form class="login__form form" @submit.prevent="onSubmit">
      <fieldset class="form__group">
        <input
          class="form__control"
          :class="{'is-invalid': isInvalidEmail}"
          type="text"
          placeholder="Email"
          v-model="email"
          @click="resetIsInvalidEmail"
        />
      </fieldset>

      <fieldset class="form__group">
        <input
          class="form__control"
          :class="{'is-invalid': isInvalidPassword}"
          type="password"
          placeholder="Password"
          v-model="password"
          @click="resetIsInvalidPassword"
        />
      </fieldset>
      <button
        class="form__submit button-primary"
        type="submit"
        :disabled="isSubmitting"
      >
        Войти
      </button>
    </form>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/auth';
import {validateEmail} from '@/helpers/validation.js';

export default {
  name: 'TLogin',
  data() {
    return {
      email: '',
      password: '',
      isInvalidEmail: false,
      isInvalidPassword: false,
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
  mounted() {
    this.isLoggedIn ? this.$router.push({name: 'projects'}) : '';
  },
  methods: {
    onSubmit() {
      if (validateEmail(this.email) && this.email && this.password) {
        this.isInvalidEmail = false;
        this.isInvalidPassword = false;
        this.$store.dispatch(actionTypes.login).then(() => {
          this.$router.push({name: 'projects'});
        });
      }

      if (!validateEmail(this.email) || !this.email) {
        this.isInvalidEmail = true;
      }

      if (!this.password) {
        this.isInvalidPassword = true;
      }
    },
    resetIsInvalidPassword() {
      this.isInvalidPassword = false;
    },
    resetIsInvalidEmail() {
      this.isInvalidEmail = false;
    },
  },
};
</script>
