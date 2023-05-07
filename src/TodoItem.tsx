import { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from './store/hooks';

import { TodoItem, deleteItem, updateItem } from './store/todoSlice';

export const TodoItemComponent = ({ id, sequence, value, done }: TodoItem) => {
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

    dispatch(updateItem({ id, sequence, done, value: updateTodoItem }));
    setUpdateMode(false);
  };

  const handleOnUpdateCancel = () => {
    setUpdateMode(false);
  };

  const handleUpdateMode = () => {
    setUpdateMode(!updateMode);
    setItemToggle(false);
  };

  const handleItemToggle = () => {
    setItemToggle(!itemToggle);
  };

  const handleOnDelete = () => {
    dispatch(deleteItem(id));
  };

  const renderToggleOption = () => {
    return (
      <div>
        <div onClick={handleUpdateMode}>EDIT</div>
        <div onClick={handleOnDelete}>DELETE</div>
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
        <button onClick={handleOnUpdateCancel}>Cancel</button>
      </form>
    );
  };

  const renderTodoItem = () => {
    return (
      // temp style
      <div style={{ marginBottom: 10 }}>
        <div>id: {id}</div>
        <div>sequence: {sequence}</div>
        <div>value: {value}</div>
        <div onClick={handleItemToggle}>setting</div>
        {itemToggle ? renderToggleOption() : null}
      </div>
    );
  };

  return <div>{updateMode ? renderUpdateMode() : renderTodoItem()}</div>;
};
