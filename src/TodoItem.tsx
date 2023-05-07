import { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from './store/hooks';

import {
  TodoItem,
  deleteItem,
  updateItem,
  updateItemStatus,
} from './store/todoSlice';

export const TodoItemComponent = ({
  id,
  sequence,
  value,
  status,
}: TodoItem) => {
  const [itemToggle, setItemToggle] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateTodoItem, setUpdateTodoItem] = useState(value);

  const dispatch = useAppDispatch();

  const handleOnUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateTodoItem(value);
  };

  const handleOnUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateItem({ id, sequence, status, value: updateTodoItem }));
    setUpdateMode(false);
  };

  const handleUpdateMode = () => {
    setUpdateMode(!updateMode);
    setItemToggle(false);
  };

  const renderToggleOption = () => {
    return (
      <div>
        <div onClick={handleUpdateMode}>EDIT</div>
        <div onClick={() => dispatch(deleteItem(id))}>DELETE</div>
      </div>
    );
  };

  const renderUpdateMode = () => {
    return (
      <form onSubmit={handleOnUpdateSubmit}>
        <div>
          <label>Update</label>
          <input
            type="text"
            name="name"
            value={updateTodoItem}
            onChange={handleOnUpdateChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => setUpdateMode(false)}>Cancel</button>
      </form>
    );
  };

  const renderStatusOption = () => {
    return (
      <div
        onClick={() =>
          dispatch(updateItemStatus({ id, sequence, value, status: !status }))
        }
      >
        status: {status ? 'tick' : 'untick'}
      </div>
    );
  };

  const renderTodoItem = () => {
    return (
      // temp style
      <div style={{ marginBottom: 10 }}>
        {renderStatusOption()}
        <div>id: {id}</div>
        <div>sequence: {sequence}</div>
        <div>value: {value}</div>
        <div onClick={() => setItemToggle(!itemToggle)}>setting</div>
        {itemToggle ? renderToggleOption() : null}
      </div>
    );
  };

  return <div>{updateMode ? renderUpdateMode() : renderTodoItem()}</div>;
};
