<template lang="pug">
  .todo-item( :class="{done: todoItemData.done}")
    button( :class="{done: todoItemData.done === true }"
      @click="$emit('onUpdateDoneTodoItem', todoItemData)"
    )
      .todo-status-marker
        img( v-if="todoItemData.done" src="@/assets/img/icon-tick.svg")
    span.description {{todoItemData.description}}
    span.todoAge {{todoAge}}
    button( class="delete-item-button" @click="$emit('onDeleteTodoItem', todoItemData)")
      img( src="@/assets/img/icon-cross.svg")
    //- button( @click="deleteItem(todoItemData)") Del
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from '@vue/composition-api';
  import { TodoItem, TimeUnits } from '@/interfaces';


  export default defineComponent ({
    name: 'TodoItemComponent',
    props: {
      todoItemData: {
        type: Object as PropType<TodoItem>,
        required: true
      }
    },
    emits: ['onDeleteTodoItem', 'onUpdateDoneTodoItem'],
    setup(props) {
      const { todoItemData } = toRefs(props);
      const computeAgeString = (age: number, units: TimeUnits) => {
        return age > 1 ? `${age} ${units}s` : `${age} ${units}`;
      };
      const todoAge = computed(() => {
        let age: string| number = "";
        const diff: number = Date.now() - Date.parse(todoItemData.value.createdAt);
        if ((diff/(1000*60*60*24)) > 1) {
          age = computeAgeString(Math.round(diff/(1000*60*60*24)), TimeUnits.day);
        } else if ((diff/(1000*60*60)) > 1) {
          age = computeAgeString(Math.round(diff/(1000*60*60)), TimeUnits.hour);
        } else {
          age = computeAgeString(Math.round(diff/(1000*60)), TimeUnits.minute);
        }
        return age;
      }
      );
      return {
        todoAge,
      };
    }
  });
</script>

<style lang="scss">


  .todo-item {
    // background-color: var(--color-white);
    padding: .5rem 1.5rem;
    border-top: 1px solid var(--color-grey-3);
    display: flex;
    align-items: center;

    &:first-of-type{
      border: none;
    }

    &:hover .delete-item-button {
      opacity: 1;
    }

    button {
      padding: 0;
    }

    .description {
      margin-left: .5rem;
    }
  }

  .done {
    color: var(--color-grey-4);

    .description {
      text-decoration:line-through;
    }

    .todo-status-marker {
      border-color: var(--color-green-1);
    }
  }
  .todoAge{
    font-size: .625rem;
    white-space: nowrap;
    margin: auto .5rem;
  }

  .delete-item-button {
    margin-left: auto;
    opacity: 0;
  }

  .todo-status-marker {
    width: 2rem;
    height: 2rem;
    display: flex;
    border: 1px solid var(--color-grey-3);
    border-radius: 1rem;

    img{
      margin: auto;
    }
  }
</style>