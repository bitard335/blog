import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogAPI } from '../../services/blogAPI';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (payload, { dispatch }) => {
  try {
    console.log('вызов');
    const { page, limit } = payload;

    const offset = (page - 1) * limit;
    const response = await blogAPI.getArticles(limit, offset);
    const totalCount = response.articlesCount;

    dispatch(setArticles({ articles: response.articles }));
    dispatch(setTotalCount({ count: totalCount }));
  } catch (err) {
    console.log(err);
    dispatch(setError());
  }
});

const articlesReducer = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    totalCount: 0,
    isError: false,
    isLoading: true,
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload.articles;
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload.count;
    },
    setError(state) {
      state.isError = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchArticles.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setArticles, setTotalCount, setError } = articlesReducer.actions;
export default articlesReducer.reducer;
