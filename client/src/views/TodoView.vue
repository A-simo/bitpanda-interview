<template lang="pug">
  .container
    template(v-if="todoData")
      .search-input
        button(@click="onSearch")
          img(src="@/assets/img/icon-search.svg")
        input.search-input__input(
          v-model="searchString"
          @keyup.enter="onSearch"
          placeholder="Search"
        )
        button(
          @click="clearSearch"
          :class="{ inactive: searchString === '' }"
        )
          img.close-icon(src="@/assets/img/icon-cross.svg")
      .add-todo(
        v-if="todoData"
        :class="{ 'add-todo_bottom-round': todoData.items.length === 0 }"
      )
        input.add-todo__input(
          v-model="newTodoDescription"
          type="text"
          placeholder="Take a note"
          @keyup.enter="onCreateNewTodo"
        )
        button(@click="onCreateNewTodo")
          img(src="@/assets/img/icon-plus.svg")
      template(v-if="todoData.items.length > 0")
        .todos-wrapper
          TodoItemComponent(
            v-for="item in todoData.items"
            :key="item._id"
            :todoItemData="item"
            @onDeleteTodoItem="deleteTodoItem($event)"
            @onUpdateDoneTodoItem="updateDoneStatus($event)"
          )
        Pagination(
          v-if="todoData.meta.pageCount > 1"
          :todoMeta = "todoData.meta"
          @onChangePage="handlePagination($event)"
        )
      template(v-else)
        .empty-list-msg Create your great task! 🙂
    template(v-else)
      img.loader(src="@/assets/img/loading.svg")
</template>

<script lang="ts">

  import { defineComponent, ref, onMounted, watchEffect } from '@vue/composition-api';
  import TodoItemComponent from '@/components/TodoItemComponent.vue';
  import Pagination from '@/components/Pagination.vue';

  import * as API from '@/api';

  import { TodoList, TodoItem, PaginationSteps } from '@/interfaces';

  export default defineComponent({
    name: 'TodoView',
    components: {
      TodoItemComponent,
      Pagination
    },
    setup() {

      const todoData = ref<TodoList | null>(null);
      const newTodoDescription = ref<string>('');
      const searchString = ref<string>('');
      const urlOffset = ref<number>(0);

      function deleteTodoItem(id: string) {
        API.deleteTodoItem(id, () =>
          API.getTodoData(todoData, searchString.value, urlOffset.value)
        );
      }

      function checkAndUpdatePagination() {
        if (todoData.value) {
          const meta = todoData.value.meta;
          if (meta.page > meta.pageCount) {
            urlOffset.value = (meta.limit * meta.pageCount) - meta.limit;
            API.getTodoData(todoData, searchString.value, urlOffset.value);
          }
        }
      }

      function updateDoneStatus(i: TodoItem) {
        API.updateDoneStatus(i, () =>
          API.getTodoData(todoData, searchString.value, urlOffset.value)
        );
      }

      function onCreateNewTodo() {
        if (newTodoDescription.value.length) {
          API.createNewTodo(newTodoDescription.value, () =>
            API.getTodoData(todoData, searchString.value, urlOffset.value));
        }
        newTodoDescription.value = '';
      }

      function onSearch() {
        urlOffset.value = 0;
        API.getTodoData(todoData, searchString.value, urlOffset.value);
      }

      function clearSearch() {
        searchString.value = '';
        onSearch();
      }

      function handlePagination(v: keyof PaginationSteps) {
        const p = todoData.value?.meta[v];
        if (todoData.value && p) {
          urlOffset.value =
            (todoData.value.meta.limit * p)
            - todoData.value.meta.limit;
          API.changePagination(urlOffset.value, todoData, searchString.value);
        }
      }

      onMounted(() => API.getTodoData(todoData, searchString.value, urlOffset.value));
      watchEffect(() => checkAndUpdatePagination());

      return {
        todoData,
        deleteTodoItem,
        updateDoneStatus,
        newTodoDescription,
        onCreateNewTodo,
        searchString,
        onSearch,
        clearSearch,
        handlePagination
      };
    },
  });
</script>

<style lang="scss">
  @import '@/assets/scss/theme.scss';

  .container {
    width: 100%;
    max-width: 590px;
    margin: auto;
    padding: var(--space-xxl);
  }

  .search-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-l);
    padding: var(--space-xs);
    background-color: var(--color-grey-3);
    border-radius: var(--space-m);

    .search-input__input {
      font-weight: 300;
      width: 100%;

      &::placeholder {
        color: var(--color-grey-5);
      }
    }
  }

  .add-todo {
    display: flex;
    padding: var(--space-l) var(--space-xl);
    background-color: var(--color-grey-1);
    border-radius: var(--space-m) var(--space-m) 0 0;
    border: 1px solid var(--color-grey-3);

    &.add-todo_bottom-round {
      border-radius: var(--space-m);
    }

    .add-todo__input {
      width: 100%;

      &::placeholder {
        color: var(--color-grey-4);
      }
    }
  }

  .todos-wrapper {
    margin-bottom: var(--space-l);
    background-color: var(--color-white);
    border-radius: 0 0 var(--space-m) var(--space-m);
    border: 1px solid var(--color-grey-3);
    border-top: none;
  }

  .empty-list-msg {
    margin: var(--space-xxl);
    text-align: center;
    font-size: var(--space-xl);
  }

  .loader {
    position: absolute;
    right: 50%;
    transform: translate3d(50%, -50%, 0);
  }

</style>
