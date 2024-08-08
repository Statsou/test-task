<template>
  <span v-if="getUrl() === '/'">
    <img src="@/assets/logo.svg" width="40" height="40" alt="Логотип" />
  </span>
  <router-link :to="{name: urlIsLoggedIn}" v-else>
    <img src="@/assets/logo.svg" width="40" height="40" alt="Логотип" />
  </router-link>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'TLogo',
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
    urlIsLoggedIn() {
      return this.isLoggedIn ? 'projects' : 'home';
    },
  },
  methods: {
    getUrl() {
      return this.$route.path;
    },
  },
};
</script>
