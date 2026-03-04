import { describe, it, expect } from 'vitest';
import itemsReducer, {
  setItems,
  setSelectedItem,
  setLoading,
  setError,
  clearError,
} from '@/store/itemsSlice';
import { Item, ItemsState } from '@/types';

describe('itemsSlice', () => {
  const initialState: ItemsState = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
  };

  const mockItem: Item = {
    guid: 'guid1',
    name: 'Test Item',
    path: ['path1', 'path2'],
    properties: {
      propString: 'value1',
      propNumber: 1,
    },
  };

  it('should return the initial state', () => {
    const state = itemsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle setItems', () => {
    const items = [mockItem];
    const state = itemsReducer(initialState, setItems(items));
    expect(state.items).toEqual(items);
    expect(state.error).toBeNull();
  });

  it('should handle setSelectedItem', () => {
    const state = itemsReducer(initialState, setSelectedItem(mockItem));
    expect(state.selectedItem).toEqual(mockItem);
  });

  it('should handle setLoading', () => {
    const state = itemsReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const state = itemsReducer(initialState, setError(errorMessage));
    expect(state.error).toBe(errorMessage);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error',
    };
    const state = itemsReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
