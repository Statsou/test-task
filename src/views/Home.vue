<template>
  <section class="home">
    <h1 class="visually-hidden">Тестовое задание - Управление проектами</h1>
    <h2 class="home__title">Домашнаяя Страница</h2>
    <router-link class="home__link button-primary" :to="{name: 'login'}">
      Начать работу
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'THome',
};
</script>
