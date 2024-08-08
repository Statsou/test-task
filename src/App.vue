<template>
  <t-header />
  <main>
    <router-view/>
  </main>
  <t-footer />
</template>

<script>
import THeader from '@/components/Header.vue';
import TFooter from '@/components/Footer.vue';


export default {
  name: 'TApp',
  components: {
    THeader,
    TFooter
  }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
