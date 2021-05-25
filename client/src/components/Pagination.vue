<template lang="pug">
  .pagination-section
    .pagination-buttons
      button(
        @click="$emit('onChangePage', 'prevPage')"
        :class="{inactive: !todoData.meta.hasPrevPage }"
      )
        img( src="@/assets/img/icon-left-arrow.svg")
      .separator
      button(
        @click="$emit('onChangePage', 'nextPage')"
        :class="{inactive: !todoData.meta.hasNextPage }"
      )
        img( src="@/assets/img/icon-right-arrow.svg")
</template>

<script lang="ts">
  import { defineComponent, PropType } from '@vue/composition-api';
  import { TodoList } from '@/interfaces';

  export default defineComponent({
    name: 'Pagination',
    props: {
      todoData: {
        type: Object as PropType<TodoList>,
        required: true
      }
    },
    emits: ['onChangePage']

  });
</script>

<style lang="scss">
  .pagination-section {
    display: flex;
    justify-content: flex-end;

    .pagination-buttons {
      background-color: var(--color-white);
      display: flex;
      align-items: center;
      padding: .5rem 0;
      border: 1px solid var(--color-grey-3);
      border-radius: .75rem;

      button {
        padding: 0 .75rem;
        display: flex;
      }

      img {
        height: 20px;
      }

      .separator {
      border-left: 1px solid var(--color-grey-5);
      height: 100%;
      }
    }
  }
</style>