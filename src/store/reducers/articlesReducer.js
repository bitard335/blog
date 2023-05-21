import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogAPI } from '../../services/blogAPI';

export const article = createAsyncThunk('articles/articleAction', async (payload, { rejectWithValue }) => {
  let response;
  let json;

  try {
    const body = payload.body;
    const token = payload.token;
    const type = payload.type;
    const slug = payload?.slug;

    if (payload.type === 'create') response = await blogAPI.createArticle(body, token);
    else if (payload.type === 'delete') await blogAPI.removeArticle(slug, token);
    else if (payload.type === 'edit') response = await blogAPI.editArticle(slug, body, token);

    json = await response?.json();
    if (response && !response.ok) throw new Error(`${payload.type} error`);
    return json;
  } catch (err) {
    return rejectWithValue(json.errors);
  }
});

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (payload, { dispatch }) => {
  try {
    const { page, limit } = payload;

    const offset = (page - 1) * limit;
    const response = await blogAPI.getArticles(limit, offset);
    const totalCount = response.articlesCount;

    dispatch(setArticles({ articles: response.articles }));
    dispatch(setTotalCount({ count: totalCount }));
  } catch (err) {
    dispatch(setError());
  }
});

const articlesReducer = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'pending',
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchArticles.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.isLoading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export const { setArticles, setTotalCount, setError } = articlesReducer.actions;
export default articlesReducer.reducer;
