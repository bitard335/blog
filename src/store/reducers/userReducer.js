import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogAPI } from '../../services/blogAPI';

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (payload, { dispatch, rejectWithValue }) => {
  let response;
  let json;

  try {
    console.log(payload);
    const userBody = payload.body;

    if (payload.type === 'login') {
      response = await blogAPI.loginUser(userBody);
    } else {
      response = await blogAPI.registerUser(userBody);
    }
    json = await response.json();
    if (!response.ok) throw new Error(`${payload.type} error`);
    dispatch(authUser(json));
  } catch (err) {
    return rejectWithValue(json.errors);
  }
});

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: undefined,
    isAuth: false,
    isError: false,
    errors: {},
  },
  reducers: {
    authUser(state, action) {
      state.isError = false;
      state.user = action.payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
        state.isError = false;
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action);
        state.errors = action.payload;
      });
  },
});

export const { authUser, setError } = userReducer.actions;

export default userReducer.reducer;
