import { Ref } from '@vue/composition-api';
import { TodoList, TodoItem } from '@/interfaces';

const url = 'http://localhost:3000/api/v1/todo/';

export function getTodoDataApi(variable: Ref<TodoList | null>,
  searchString: string, offset: number) {
  fetch(`${url}?offset=${offset}&description=${searchString}`)
    .then((r) => r.json())
    .then((j:TodoList) => variable.value = j)
    .catch((error) => console.log(error));
}

export function deleteTodoItemApi(item: TodoItem, onSuccess: Function) {
  fetch(`${url}${item._id}`, { method: 'DELETE' })
    .then((r) => { if(r.ok) {
      onSuccess();
    }})
    .catch((error) => console.log(error));
}

export function updateDoneStatusApi(item: TodoItem, onSuccess: Function) {
  fetch(`${url}${item._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      done: !item.done
    })
  })
  .then((r) => { if(r.ok) {
      onSuccess();
    }
  })
  .catch((error) => console.log(error));
}

export function createNewTodoApi(descr: string, onSuccess: Function) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      description: descr
    })
  })
  .then((r) => { if (r.ok) {
      return r.json();
    }
    return null;
  }).then(() => onSuccess() )
  .catch((error) => console.log(error));
}

export function changePaginationApi(offset: number,
variable: Ref<TodoList | null>,
searchString: string) {
  fetch(`${url}?offset=${offset}&description=${searchString}`)
  .then((r) => r.json())
  .then((j:TodoList) => variable.value = j)
  .catch((error) => console.log(error));
}