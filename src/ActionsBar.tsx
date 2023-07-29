import { UndoManager } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';

interface IActionsBar {
  undoManager: UndoManager;
}

const ActionsBar: React.FC<IActionsBar> = observer(({ undoManager }) => {
  const style = {
    container: 'flex justify-end',
    actionButton: 'border rounded-md text-lg font-bold p-2 ml-2',
    inactive: 'text-gray-500',
  };

  const handleUndo = () => {
    if (undoManager.canUndo) undoManager.undo();
  };

  const handleRedo = () => {
    if (undoManager.canRedo) undoManager.redo();
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
    </div>
  );
});

export default ActionsBar;
