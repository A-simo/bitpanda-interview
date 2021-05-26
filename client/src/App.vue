<template lang="pug">
  #app.todo-app
    TodoView
</template>

<script lang="ts">

  import { defineComponent } from '@vue/composition-api';
  import TodoView from '@/views/TodoView.vue';

  export default defineComponent({
    name: 'App',
    components: {
      TodoView
    }
  });
</script>

<style lang="scss">
 @import '@/assets/scss/theme.scss';

.todo-app {
  display: flex;
  margin: auto;
  width: 100%;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background-color: var(--color-grey-2);
}

.inactive {
  pointer-events: none;
  opacity: .5;
}
</style>
