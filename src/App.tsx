import { observer } from 'mobx-react-lite';

import { createRootStore } from './store';
import AddTodo from './Todo/AddTodo';
import RenderTodos from './Todo/RenderTodos';
import ActionsBar from './ActionsBar';

export const [todoStore, undoManager] = createRootStore();

const App = observer(() => {
  const style = {
    container: 'flex flex-col items-center px-3 pt-6',
    title: 'text-4xl',
    todosWrap: 'flex flex-col',
  };
  const title = 'Yet Another ToDo list...';

  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>

      <div className={style.todosWrap}>
        <AddTodo />

        <RenderTodos />
        <RenderTodos isDone />

        <ActionsBar />
      </div>
    </div>
  );
});

export default App;
