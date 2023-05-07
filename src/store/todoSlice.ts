import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface TodoState {
  value: TodoItem[];
}

export interface TodoItem {
  id: number;
  sequence: number;
  value: string;
  done: boolean;
}

const initialState: TodoState = {
  value: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      if (state.value.length === 0) {
        state.value.push({
          id: 1,
          sequence: 1,
          value: action.payload,
          done: false,
        });

        return;
      }

      const lastItemValue = state.value[state.value.length - 1];
      const newState: TodoItem = {
        id: lastItemValue.id + 1,
        sequence: lastItemValue.sequence + 1,
        value: action.payload,
        done: false,
      };

      state.value.push(newState);
    },
    updateItem: (state, action: PayloadAction<TodoItem>) => {
      state.value.map(item => {
        if (item.id === action.payload.id) {
          item.value = action.payload.value;
        }
      });
    },
    updateItemStatus: (state, action: PayloadAction<TodoItem>) => {
      state.value.map(item => {
        if (item.id === action.payload.id) {
          item.done = !action.payload.done;
        }
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.value;
export default todoSlice.reducer;
