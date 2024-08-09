<template>
  <div class="menu">
    <router-link
      class="menu__link"
      :class="`${modificator}__link-edit`"
      :to="{name: nameLink, params: {slug: slug}}"
    >
      <span class="visually-hidden">Редактировать</span>
      <svg
        class="menu__icon-edit"
        :class="modificator? `${modificator}__icon-edit` : ''"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
      >
        <path
          d="M11.43 2.29h-8a2.28 2.28 0 0 0-2.29 2.28v16a2.28 2.28 0 0 0 2.3 2.29h16a2.28 2.28 0 0 0 2.27-2.3v-7.99m-3-10.71a2.43 2.43 0 0 1 3.43 3.43l-10.3 10.3c-.27.27-.6.47-.97.57l-3.29.96c-.2.05-.4 0-.55-.15a.55.55 0 0 1-.15-.55l.96-3.29c.1-.37.3-.7.57-.97Zm0 0"
          fill="none"
          stroke-width="2"
          transform="scale(.41667)"
        />
      </svg>
    </router-link>
    <button
      class="menu__button-delete"
      :class="`${modificator}__button-delete`"
      @click="onDeleteItem"
    >
      <span class="visually-hidden">Удалить</span>
      <svg
        class="menu__icon-trash"
        :class="`${modificator}__icon-trash`"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="11"
        viewBox="0 0 10 10"
      >
        <path
          d="M1.75 6.5h22.5M21.75 6.5V24c0 1.25-1.25 2.5-2.5 2.5H6.75c-1.25 0-2.5-1.25-2.5-2.5V6.5M8 6.5V4c0-1.25 1.25-2.5 2.5-2.5h5C16.75 1.5 18 2.75 18 4v2.5M10.5 12.75v7.5M15.5 12.75v7.5"
          fill="none"
          stroke-width="2"
          transform="scale(.38461 .35714)"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TMenuItem',
  props: {
    nameLink: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    modificator: {
      type: String,
      required: false,
    },
  },
  methods: {
    onDeleteItem() {
      this.$emit('onDeleteItem');
    },
  },
};
</script>
