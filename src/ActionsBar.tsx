import { observer } from 'mobx-react-lite';

import cn from 'classnames';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';

import { todoStore, undoManager } from './App';
import { Todo } from './store';

const ActionsBar: React.FC = observer(() => {
  const style = {
    container: 'flex justify-end mb-4',
    actionButton: 'border border-black rounded-md text-xl font-bold p-2 ml-2',
    inactive: 'text-gray-500 border-gray-500',
    saveButton: 'border-2 border-green-600 rounded-md text-green-600 font-medium px-3 py-1.5 ml-2',
  };

  const handleUndo = () => {
    if (undoManager.canUndo) undoManager.undo();
  };

  const handleRedo = () => {
    if (undoManager.canRedo) undoManager.redo();
  };

  const handleSave = () => {
    // remove prev save
    localStorage.clear();

    const todoKeys = todoStore.all
      .map((todo: Todo) => {
        localStorage.setItem(`${todo.id}_val`, todo.value);
        localStorage.setItem(`${todo.id}_done`, todo.done ? '1' : '0');

        return todo.id;
      })
      .join(' ');

    localStorage.setItem('todoStore', todoKeys);
  };

  return (
    <div className={style.container}>
      <button
        onClick={handleUndo}
        className={cn(style.actionButton, !undoManager.canUndo && style.inactive)}
      >
        <BsArrowCounterclockwise />
      </button>
      <button
        onClick={handleRedo}
        className={cn(style.actionButton, !undoManager.canRedo && style.inactive)}
      >
        <BsArrowClockwise />
      </button>

      <button onClick={handleSave} className={style.saveButton}>
        Save
      </button>
    </div>
  );
});

export default ActionsBar;
