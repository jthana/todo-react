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
      <div className="progress-bar">
        <div
          className="progress-bar__running"
          style={{ width: `${progressLevel}%` }}
        />
      </div>
    );
  };

  const renderStatusFilter = () => {
    return (
      <ul>
        <li onClick={() => dispatch(getFilterItems(FILTER_ALL_ITEMS))}>all</li>
        <li onClick={() => dispatch(getFilterItems(FILTER_DONE_ITEMS))}>
          done
        </li>
        <li onClick={() => dispatch(getFilterItems(FILTER_UNDONE_ITEMS))}>
          undone
        </li>
      </ul>
    );
  };

  const renderTodoItem = () => {
    const selectedRenderedList =
      filteredValue.length > 0 ? filteredValue : value;
    return (
      <>
        {selectedRenderedList.map((item, index) => (
          <TodoItemComponent {...item} key={index} />
        ))}
      </>
    );
  };

  const addTodoRender = () => {
    return (
      <div>
        <form onSubmit={handleAddTodoOnSubmit}>
          <div>
            <label>Add</label>
            <input
              type="text"
              name="name"
              value={addTodoItem}
              onChange={handleAddTodoOnChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Redux todo example</h1>
      {renderProgressBar()}
      {renderStatusFilter()}
      {renderTodoItem()}
      {addTodoRender()}
    </div>
  );
}

export default App;
