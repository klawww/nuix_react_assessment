import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, ItemsState } from '@/types';

const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    setSelectedItem: (state, action: PayloadAction<Item | null>) => {
      state.selectedItem = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setItems, setSelectedItem, setLoading, setError, clearError } =
  itemsSlice.actions;
export default itemsSlice.reducer;
