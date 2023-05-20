import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogAPI } from '../../services/blogAPI';

export const removeArticle = createAsyncThunk('articles/addArticle', async (payload, { rejectWithValue }) => {
  let json;

  try {
    console.log('создание');
    const slug = payload.slug;
    const token = payload.token;

    json = await blogAPI.removeArticle(slug, token);
  } catch (err) {
    console.log(err);
    return rejectWithValue(json.errors);
  }
});

export const addArticle = createAsyncThunk('articles/addArticle', async (payload, { rejectWithValue }) => {
  let response;
  let json;

  try {
    console.log('создание');
    const body = payload.body;
    const token = payload.token;
    console.log(token);

    if (payload.type === 'add') {
      response = await blogAPI.createArticle(body, token);
    } else {
      response = await blogAPI.createArticle(body, token);
    }
    json = await response.json();
    if (!response.ok) throw new Error(`${payload.type} error`);
  } catch (err) {
    console.log(err);
    return rejectWithValue(json.errors);
  }
});

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
      })
      .addCase(addArticle.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addArticle.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.isLoading = false;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export const { setArticles, setTotalCount, setError } = articlesReducer.actions;
export default articlesReducer.reducer;
