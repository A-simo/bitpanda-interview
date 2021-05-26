<template lang="pug">
  .todo-item(:class="{ 'todo-item_done': props.todoItemData.done }")
    button.todo-item__button(
      :class="{ 'todo-item_done': props.todoItemData.done }"
      @click="$emit('onUpdateDoneTodoItem', props.todoItemData)"
    )
      .todo-item__status-marker
        img.todo-item_img(
          v-if="todoItemData.done"
          src="@/assets/img/icon-tick.svg"
        )
    span.todo-item__description {{props.todoItemData.description}}
    span.todo-item__age {{calcTodoAge()}}
    button(
      class="delete-item-button"
      @click="$emit('onDeleteTodoItem', props.todoItemData._id)"
    )
      img(src="@/assets/img/icon-cross.svg")
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from '@vue/composition-api';
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
      const computeAgeString = (age: number, units: TimeUnits) => {
        return `${age} ${units}${ age === 1 ? '' : 's'}`;
        // return age === 1 ? `${age} ${units}` : `${age} ${units}s`;
      };

      function calcTodoAge() {
        let age: string = "";
        const diff: number = Date.now() - Date.parse(props.todoItemData.createdAt);
        if ((diff/(1000*60*60*24)) > 1) {
          age = computeAgeString(Math.round(diff/(1000*60*60*24)), TimeUnits.Day);
        } else if ((diff/(1000*60*60)) > 1) {
          age = computeAgeString(Math.round(diff/(1000*60*60)), TimeUnits.Hour);
        } else {
          age = computeAgeString(Math.round(diff/(1000*60)), TimeUnits.Minute);
        }
        return age;
      }

      computed(() => calcTodoAge());

      return {
        calcTodoAge,
        props
      };
    }
  });
</script>

<style lang="scss">
  .todo-item {
    display: flex;
    align-items: center;
    padding: var(--space-xs) var(--space-xl);
    border-top: 1px solid var(--color-grey-3);

    &:first-of-type{
      border: none;
    }

    &:hover .delete-item-button {
      opacity: 1;
    }

    .todo-item__button {
      padding: 0;
    }

    .todo-item__description {
      margin-left: var(--space-xs);
    }

    .todo-item__status-marker {
      width: var(--space-xxl);
      height: var(--space-xxl);
      display: flex;
      border: 1px solid var(--color-grey-3);
      border-radius: var(--space-l);

      .todo-item_img{
        margin: auto;
      }
    }

    .todo-item__age {
      margin: auto var(--space-xs);
      font-size: var(--space-s);
      white-space: nowrap;
    }

    .delete-item-button {
      margin-left: auto;
      opacity: 0;
    }
  }

  .todo-item_done {
    color: var(--color-grey-4);

    .todo-item__description {
      text-decoration:line-through;
    }

    .todo-item__status-marker {
      border-color: var(--color-green-1);
    }
  }

  @media (hover: none) {
    .todo-item .delete-item-button  {
      opacity: .5;
    }
  }
</style>