<template lang="pug">
  #app.todo-app
    .container
      .search-input
        button( @click="onSearch" )
          img( src="@/assets/img/icon-search.svg")
        input( v-model="searchString" @keyup.enter="onSearch" placeholder="Search")
        button( @click="clearSearch" :class="{inactive: searchString === ''}")
          img.close-icon( src="@/assets/img/icon-cross.svg")
      .add-todo( :class="{'bottom-round': todoData.items.length === 0}")
        input(
          v-model="newTodoDescription"
          type="text"
          placeholder="Take a note"
          @keyup.enter="onCreateNewTodo"
        )
        button(@click="onCreateNewTodo")
          img( src="@/assets/img/icon-plus.svg" )
      template( v-if="todoData")
        template( v-if="todoData.items.length > 0")
          .todos-wrapper
            TodoItemComponent( v-for="(item, index) in todoData.items"
            :key="index"
            :todoItemData="item"
            @onDeleteTodoItem="deleteTodoItem($event)"
            @onUpdateDoneTodoItem="updateDoneStatus($event)" )
          Pagination(
            v-if="todoData.meta.pageCount > 1"
            :todoData = "todoData"
            @onChangePage="handlePagination($event)"
          )
        template( v-else )
          .empty-list-msg Create your great task! 🙂
      template( v-else )
        img( src="@/assets/img/loading.svg" )
</template>

<script lang="ts">

  import { defineComponent, ref, onMounted, onUpdated } from '@vue/composition-api';
  import TodoItemComponent from '@/components/TodoItemComponent.vue';
  import Pagination from '@/components/Pagination.vue';

  import { getTodoDataApi,
           deleteTodoItemApi,
           updateDoneStatusApi,
           createNewTodoApi,
           changePaginationApi
  } from '@/api';

  import { TodoList, TodoItem, PaginationSteps } from '@/interfaces';

  export default defineComponent({
    name: 'App',
    components: {
      TodoItemComponent,
      Pagination
    },
    setup() {

      const todoData = ref<TodoList | null>(null);
      const newTodoDescription = ref<string>('');
      const searchString = ref<string>('');
      let urlOffset = ref<number>(0);

      const deleteItemFromList = (i: TodoItem) => {
        if (todoData.value) {
          const itemToDelete = todoData.value.items.findIndex(
            (item: TodoItem) => item._id === i._id
          );
          todoData.value.items.splice(itemToDelete, 1);
        }
      };
      const deleteTodoItem = (i: TodoItem) =>
        deleteTodoItemApi(i, () =>
          getTodoDataApi(todoData, searchString.value, urlOffset.value) );

      const updateDoneInList = (i: TodoItem) => {
        if (todoData.value) {
          const itemToUpdate = todoData.value.items.findIndex(
            (item: TodoItem) => item._id === i._id
          );
          todoData.value.items[itemToUpdate].done = !todoData.value.items[itemToUpdate].done;
        }
      };

      const updateDoneStatus = (i: TodoItem) => updateDoneStatusApi(i, () => updateDoneInList(i));

      const onCreateNewTodo = () => {
        if (newTodoDescription.value !== '') {
          createNewTodoApi(newTodoDescription.value, () =>
            getTodoDataApi(todoData, searchString.value, urlOffset.value));
        }
        newTodoDescription.value = '';
      };

      const onSearch = () => {
        urlOffset.value = 0;
        getTodoDataApi(todoData, searchString.value, urlOffset.value);
      };

      const clearSearch = () => {
        searchString.value = '';
        onSearch();
      };

      const handlePagination = (v: keyof PaginationSteps) => {
        if (todoData.value) {
          urlOffset.value =
            ( todoData.value.meta.limit * todoData.value.meta[v] )
            - todoData.value.meta.limit;
          changePaginationApi(urlOffset.value, todoData, searchString.value);
        }
      };
      onMounted(() => getTodoDataApi(todoData, searchString.value, urlOffset.value));
      onUpdated(() => {
        if (todoData.value ) {
          const meta = todoData.value.meta;
          if (meta.page > meta.pageCount) {
            urlOffset.value = (meta.limit * meta.pageCount) - meta.limit;
            getTodoDataApi(todoData, searchString.value, urlOffset.value);
          }
        }
      });

      return {
        todoData,
        deleteTodoItem,
        deleteItemFromList,
        updateDoneInList,
        updateDoneStatus,
        newTodoDescription,
        onCreateNewTodo,
        searchString,
        onSearch,
        clearSearch,
        handlePagination,
        urlOffset
      };
    },
  });
</script>

<style lang="scss">
 @import '@/assets/scss/theme.scss';

.todo-app {
  margin: auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
}

  .container {
    max-width: 37rem;
    margin: auto;
    padding: 2rem;
    width: 100%;
  }

  .add-todo {
    display: flex;
    background-color: var(--color-grey-1);
    padding: 1rem 1.5rem;
    border-radius: .75rem .75rem 0 0;
    border: 1px solid var(--color-grey-3);

    &.bottom-round {
    border-radius: .75rem;
    }

    input {
      width: 100%;

      &::placeholder {
        color: var(--color-grey-4);
      }
    }
  }

  .todos-wrapper{
    background-color: var(--color-white);
    border-radius: 0 0 .75rem .75rem;
    border: 1px solid var(--color-grey-3);
    border-top: none;
    margin-bottom: 1rem;
  }

  .search-input {
    padding: .5rem;
    background-color: var(--color-grey-3);
    border-radius: .75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;


    input {
      font-weight: 300;
      width: 100%;

      &::placeholder {
      color: var(--color-grey-5);
    }
    }
  }

  .empty-list-msg {
    margin: 2rem;
    text-align: center;
    font-size: 1.5rem;
  }

</style>
