import { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  addItem,
  getFilterItems,
  FILTER_ALL_ITEMS,
  FILTER_DONE_ITEMS,
  FILTER_UNDONE_ITEMS,
} from './store/todoSlice';

import './App.scss';
import { TodoItemComponent } from './TodoItem';

function App() {
  const [addTodoItem, setAddTodoItem] = useState('');
  const [isFiltedToggle, setIsFilterToggled] = useState(false);

  const dispatch = useAppDispatch();
  const { value, filteredValue } = useAppSelector(state => state.todo);

  const handleAddTodoOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddTodoItem(value);
  };

  const handleAddTodoOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addItem(addTodoItem));
    setAddTodoItem('');
  };

  const renderProgressBar = () => {
    const allItems = value.length;
    const doneItems = value.filter(item => item.status == true).length;

    const progressLevel = doneItems > 0 ? (doneItems / allItems) * 100 : 0;

    return (
      <div className="progress">
        <div className="progress__text">Progress</div>
        <div className="progress__bar">
          <div
            className="progress__bar--running"
            style={{ width: `${progressLevel}%` }}
          />
        </div>
        <div className="progress__completed">{doneItems} completed</div>
      </div>
    );
  };

  const renderStatusFilter = () => {
    return (
      <div className="task-container__header__dropdown">
        <button
          className="task-container__header__dropdown__button"
          onClick={() => setIsFilterToggled(!isFiltedToggle)}
        >
          All
        </button>
        {isFiltedToggle ? (
          <ul className="task-container__header__dropdown__button__list">
            <li onClick={() => dispatch(getFilterItems(FILTER_ALL_ITEMS))}>
              All
            </li>
            <li onClick={() => dispatch(getFilterItems(FILTER_DONE_ITEMS))}>
              Done
            </li>
            <li onClick={() => dispatch(getFilterItems(FILTER_UNDONE_ITEMS))}>
              Undone
            </li>
          </ul>
        ) : null}
      </div>
    );
  };

  const renderTodoItem = () => {
    const selectedRenderedList =
      filteredValue.length > 0 ? filteredValue : value;
    return (
      <div className="task-container__pills__item-lists">
        {selectedRenderedList.map((item, index) => (
          <TodoItemComponent {...item} key={index} />
        ))}
      </div>
    );
  };

  const renderAddTodo = () => {
    return (
      <div className="task-container__pills__add-todo">
        <form
          onSubmit={handleAddTodoOnSubmit}
          className="task-container__pills__add-todo__form"
        >
          <input
            type="text"
            name="name"
            value={addTodoItem}
            onChange={handleAddTodoOnChange}
            className="task-container__pills__add-todo__form__input1"
            placeholder="Add your todo..."
          />
          <input
            type="submit"
            style={{ display: 'none' }}
            className="task-container__pills__add-todo__form__input2"
          />
        </form>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="container__wrapper">
        {renderProgressBar()}
        <div className="task-container">
          <div className="task-container__header">
            <div className="task-container__header__text">Tasks</div>
            {renderStatusFilter()}
          </div>
          <div className="task-container__pills">
            {renderTodoItem()}
            {renderAddTodo()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
