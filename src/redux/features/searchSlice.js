import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPhotos, fetchGifs, fetchVideos } from '../../api/mediaApi';

export const fetchMedia = createAsyncThunk(
  'search/fetchMedia',
  async ({ query, mediaType }, { rejectWithValue }) => {
    try {
      let data = [];
      if (mediaType === 'photos') {
        data = await fetchPhotos(query);
      } else if (mediaType === 'gifs') {
        data = await fetchGifs(query);
      } else if (mediaType === 'videos') {
        data = await fetchVideos(query);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch media');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: 'nature',
    activeTab: 'photos', // 'photos' | 'gifs' | 'videos'
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setQuery, setActiveTab } = searchSlice.actions;
export default searchSlice.reducer;
