<template>
  <t-header />
  <main>
    <router-view />
  </main>
  <t-footer />
</template>

<script>
import THeader from '@/components/Header.vue';
import TFooter from '@/components/Footer.vue';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'TApp',
  components: {
    THeader,
    TFooter,
  },
  mounted() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.$store.dispatch(actionTypes.login);
    }
  },
};
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
