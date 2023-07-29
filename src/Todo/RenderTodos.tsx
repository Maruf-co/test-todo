import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { GridList, Item } from 'react-aria-components';

import { BsFillCheckCircleFill, BsCircle } from 'react-icons/bs';

import { Todo } from '../store';

interface IRenderTodos {
  list: Todo[];
  isDone?: boolean;
  title?: string;
}

const RenderTodos: React.FC<IRenderTodos> = observer(({ list, isDone = false, title = 'TODO' }) => {
  const style = {
    container: 'ml-1 my-4',
    title: 'text-2xl',
    noItems: 'my-2 text-xl text-gray-500',
    todoList: 'my-2',
    todoItem: cn(
      'border flex items-center px-1 py-2 first:rounded-t-md last:rounded-b-md',
      isDone && 'text-gray-500 line-through'
    ),
    checkButton: 'text-md mx-1',
    todoText: 'text-lg',
  };

  const handleClick = (todo: Todo) => {
    todo.setDone(!todo.done);
  };

  const renderGridList = (
    <GridList aria-label="Ongoing todos list" className={style.todoList}>
      {list.map((todo: Todo) => {
        return (
          <Item key={todo.id} textValue={todo.value} className={style.todoItem}>
            <button onClick={() => handleClick(todo)} className={style.checkButton}>
              {isDone ? <BsFillCheckCircleFill /> : <BsCircle />}
            </button>
            <span className={style.todoText}>{todo.value}</span>
          </Item>
        );
      })}
    </GridList>
  );

  const noItems = <div className={style.noItems}>No items yet</div>;

  return (
    <div className={style.container}>
      <h3 className={style.title}>{title}</h3>
      {list.length > 0 ? renderGridList : noItems}
    </div>
  );
});

export default RenderTodos;
