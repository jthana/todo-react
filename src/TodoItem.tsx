import { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from './store/hooks';
import { BsThreeDots } from 'react-icons/bs';

import {
  TodoItem,
  deleteItem,
  updateItem,
  updateItemStatus,
} from './store/todoSlice';

import './TodoItem.scss';

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

  const renderStatusOption = () => {
    return (
      <label className="todo-item__value__checkbox__wrapper">
        <input
          type="checkbox"
          onChange={() =>
            dispatch(updateItemStatus({ id, sequence, value, status: !status }))
          }
          checked={status}
          className="todo-item__value__checkbox__input"
        />
        <span className="todo-item__value__checkbox__checkmark"></span>
      </label>
    );
  };

  const renderToggleOption = () => {
    return (
      <div className="todo-item__options__toggle-list">
        <div
          className="todo-item__options__toggle-list__edit"
          onClick={handleUpdateMode}
        >
          Edit
        </div>
        <div
          className="todo-item__options__toggle-list__delete"
          onClick={() => dispatch(deleteItem(id))}
        >
          Delete
        </div>
      </div>
    );
  };

  const renderTodoItem = () => {
    const textStatus = status ? ' todo-item__value__text--checked' : '';

    return (
      <div className="todo-item-container">
        <div className="todo-item__value">
          {renderStatusOption()}
          <div className={'todo-item__value__text' + textStatus}>{value}</div>
        </div>

        <div
          className="todo-item__options"
          onClick={() => setItemToggle(!itemToggle)}
        >
          <div className="todo-item__options__dots">
            <BsThreeDots />
          </div>
          {itemToggle ? renderToggleOption() : null}
        </div>
      </div>
    );
  };

  const renderUpdateMode = () => {
    return (
      <div className="todo-item-container">
        <form
          onSubmit={handleOnUpdateSubmit}
          className="todo-item-container__form"
        >
          <div className="todo-item-container__form__content">
            <input
              type="text"
              name="name"
              value={updateTodoItem}
              onChange={handleOnUpdateChange}
            />
            <button type="submit">Save</button>
          </div>
          {/* <button onClick={() => setUpdateMode(false)}>Cancel</button> */}
        </form>
      </div>
    );
  };

  return <div>{updateMode ? renderUpdateMode() : renderTodoItem()}</div>;
};
