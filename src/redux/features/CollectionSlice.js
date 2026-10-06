import { createSlice } from '@reduxjs/toolkit';

const loadSavedCollection = () => {
  try {
    const saved = localStorage.getItem('userCollection');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCollectionToStorage = (items) => {
  try {
    localStorage.setItem('userCollection', JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    items: loadSavedCollection(),
  },
  reducers: {
    addToCollection: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveCollectionToStorage(state.items);
      }
    },
    removeFromCollection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCollectionToStorage(state.items);
    },
    clearCollection: (state) => {
      state.items = [];
      saveCollectionToStorage([]);
    },
  },
});

export const { addToCollection, removeFromCollection, clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
