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
import { defaultDoneTodos, defaultOngoingTodos } from './constants';

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
    console.log(todo.id, todo.value, todo.done);
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
    return this.todos.filter((t) => !t.done);
  }

  @computed
  get done() {
    return this.todos.filter((t) => t.done);
  }
}

export function createRootStore(): [TodoList, UndoManager] {
  const ongoingTodos = defaultOngoingTodos.map((todo) => {
    return new Todo({ value: todo });
  });
  const doneTodos = defaultDoneTodos.map((todo) => {
    return new Todo({ value: todo, done: true });
  });

  const rootStore = new TodoList({
    todos: [...ongoingTodos, ...doneTodos],
  });

  const undoManager = undoMiddleware(rootStore);

  return [rootStore, undoManager];
}
