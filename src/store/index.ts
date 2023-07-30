import { computed } from 'mobx';
import {
  model,
  Model,
  modelAction,
  tProp,
  types,
  undoMiddleware,
  UndoManager,
} from 'mobx-keystone';

import { v4 as uuid } from 'uuid';
import { defaultTodos } from './constants';

@model('YetAnotherApp/Todo')
export class Todo extends Model({
  id: tProp(types.string, () => uuid()),
  value: tProp(types.string),
  done: tProp(types.boolean, false),
}) {
  @modelAction
  setDone(done: boolean) {
    this.done = done;
  }
}

@model('YetAnotherApp/TodoList')
export class TodoList extends Model({
  todos: tProp(types.array(types.model<Todo>(Todo)), () => []),
}) {
  @modelAction
  add(todo: Todo) {
    this.todos.push(todo);
  }

  @modelAction
  remove(todo: Todo) {
    const id = this.todos.indexOf(todo);
    if (id >= 0) {
      this.todos.splice(id, 1);
    }
  }

  @computed
  get ongoing() {
    return this.todos.filter((t: Todo) => !t.done);
  }

  @computed
  get done() {
    return this.todos.filter((t: Todo) => t.done);
  }

  @computed
  get all(): Todo[] {
    return this.todos;
  }
}

export function createRootStore(): [TodoList, UndoManager] {
  // getting keys from prev localStorage
  const keys = localStorage.getItem('todoStore');

  let todos;
  if (keys !== null) {
    todos =
      keys.length > 0
        ? keys.split(' ').map((key) => {
            return new Todo({
              value: localStorage.getItem(`${key}_val`) || '',
              done: localStorage.getItem(`${key}_done`) === '1' ? true : false,
            });
          })
        : [];
  } else {
    todos = defaultTodos.map((todo) => {
      return new Todo({ value: todo.value, done: todo.done });
    });
  }

  const rootStore = new TodoList({
    todos,
  });

  const undoManager = undoMiddleware(rootStore);

  return [rootStore, undoManager];
}
