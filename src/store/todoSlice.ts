import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface TodoState {
  value: TodoItem[];
  filteredValue: TodoItem[];
}

export interface TodoItem {
  id: number;
  sequence: number;
  value: string;
  status: boolean;
}

export const FILTER_ALL_ITEMS = '';
export const FILTER_DONE_ITEMS = 'done';
export const FILTER_UNDONE_ITEMS = 'undone';

const initialState: TodoState = {
  value: [],
  filteredValue: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getFilterItems: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case FILTER_DONE_ITEMS:
          state.filteredValue = state.value.filter(item => item.status == true);
          break;
        case FILTER_UNDONE_ITEMS:
          state.filteredValue = state.value.filter(
            item => item.status == false
          );
          break;
        case FILTER_ALL_ITEMS:
        default:
          state.filteredValue = [];
          break;
      }
    },
    addItem: (state, action: PayloadAction<string>) => {
      if (state.value.length === 0) {
        state.value.push({
          id: 1,
          sequence: 1,
          value: action.payload,
          status: false,
        });

        return;
      }

      const lastItemValue = state.value[state.value.length - 1];
      const newState: TodoItem = {
        id: lastItemValue.id + 1,
        sequence: lastItemValue.sequence + 1,
        value: action.payload,
        status: false,
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
          item.status = action.payload.status;
        }
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  getFilterItems,
  addItem,
  updateItem,
  deleteItem,
  updateItemStatus,
} = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.value;
export default todoSlice.reducer;
