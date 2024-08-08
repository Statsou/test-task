<template>
  <header class="main-header">
    <t-logo />
    <div class="main-header__logout" v-if="isLoggedIn">
      <span class="visually-hidden">Выйти из аккаунта</span>
      <button class="main-header__logout-button" type="button" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 19">
          <path d="M16.2 1.6v15.9m10.35-8.6a14.1 14.1 0 0 1 3.17 15.58 14.36 14.36 0 0 1-5.35 6.44 14.75 14.75 0 0 1-16.17.05 14.41 14.41 0 0 1-5.39-6.4 14.1 14.1 0 0 1 3.07-15.6" transform="scale(.55882 .54286)" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/auth';
import TLogo from '@/components/Logo.vue';

export default {
  name: 'THeader',
  components: {
    TLogo
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.logout)
      .then(() =>
        this.$router.push({name: 'login'})
      )
    }
  }
}
</script>
