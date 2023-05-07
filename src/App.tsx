import { useState, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addItem } from './store/todoSlice';

import './App.scss';
import { TodoItemComponent } from './TodoItem';

function App() {
  const [addTodoItem, setAddTodoItem] = useState('');

  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todo.value);

  const handleAddTodoOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddTodoItem(value);
  };

  const handleAddTodoOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addItem(addTodoItem));
    setAddTodoItem('');
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
      <div>
        {todo.map((item, index) => (
          <TodoItemComponent {...item} key={index} />
        ))}
      </div>
      {addTodoRender()}
    </div>
  );
}

export default App;
