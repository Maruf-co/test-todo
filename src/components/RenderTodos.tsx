import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { GridList, Item } from 'react-aria-components';
import { BsFillCheckCircleFill, BsCircle } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Todo } from '../store';
import { todoStore } from '../App';

interface IRenderTodos {
  isDone?: boolean;
}

const RenderTodos: React.FC<IRenderTodos> = observer(({ isDone = false }) => {
  const style = {
    container: 'ml-1 my-4',
    title: 'text-2xl',
    noItems: 'my-2 text-xl text-gray-500',
    todoList: 'my-2',
    todoItemWrap: cn(
      `border-x-[1px] border-t-[1px] px-1 pb-2 pt-2.5 hover:bg-gray-100
        first:rounded-t-md last:rounded-b-md last:border-b-[1px]`,
      isDone && 'text-gray-500 line-through'
    ),
    todoContent: 'flex justify-between',
    checkButton: 'text-md mx-1.5 hover:text-green-600',
    todoText: 'text-lg',
    removeTodo: 'text-gray-500 text-md relative right-2 hover:text-red-500',
  };

  const title = isDone ? 'DONE' : 'TODO';

  const handleDone = (todo: Todo) => {
    todo.setDone(!todo.done);
  };

  const handleRemove = (todo: Todo) => {
    todoStore.remove(todo);
  };

  const gridList = isDone ? todoStore.done : todoStore.ongoing;

  let renderGridList;
  if (gridList.length > 0) {
    renderGridList = (
      <GridList aria-label="Ongoing todos list" className={style.todoList}>
        {gridList.map((todo: Todo) => {
          return (
            <Item key={todo.id} textValue={todo.value} className={style.todoItemWrap}>
              <div className={style.todoContent}>
                <div>
                  <button onClick={() => handleDone(todo)} className={style.checkButton}>
                    {isDone ? <BsFillCheckCircleFill /> : <BsCircle />}
                  </button>
                  <span className={style.todoText}>{todo.value}</span>
                </div>
                <button onClick={() => handleRemove(todo)} className={style.removeTodo}>
                  <AiFillCloseCircle />
                </button>
              </div>
            </Item>
          );
        })}
      </GridList>
    );
  } else {
    renderGridList = <div className={style.noItems}>No items yet</div>;
  }

  return (
    <div className={style.container}>
      <h3 className={style.title}>{title}</h3>
      {renderGridList}
    </div>
  );
});

export default RenderTodos;
