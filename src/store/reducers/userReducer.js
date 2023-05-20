import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogAPI } from '../../services/blogAPI';

export const fetchAuth = createAsyncThunk(
  'user/fetchAuth',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    let response;
    let json;

    try {
      const token = getState().user.token;
      const userBody = payload.body;

      if (payload.type === 'login') {
        response = await blogAPI.loginUser(userBody);
      } else if (payload.type === 'register') {
        response = await blogAPI.registerUser(userBody);
      } else if (payload.type === 'edit') {
        response = await blogAPI.putUserProfile(token, userBody);
      }
      json = await response.json();
      if (!response.ok) throw new Error(`${payload.type} error`);

      const user = token ? { ...json.user, token: token } : json.user;
      dispatch(authUser({ user: user }));
    } catch (err) {
      console.log(err);
      return rejectWithValue(json.errors);
    }
  }
);

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: 'sus',
      email: 'sus@mail.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhmYjliNjBjNjc1MWIwMGI3Nzg2OCIsInVzZXJuYW1lIjoic3VzIiwiZXhwIjoxNjg5Nzg1NzU1LCJpYXQiOjE2ODQ2MDE3NTV9.pNQtN6Wwk372lb2wMpDvGfJhsAyZR65RkErXC9A7ZDQ',
    },
    isAuth: true,
    isLoading: false,
    isError: false,
    status: 'not started',
    formErrors: {},
  },
  reducers: {
    authUser(state, action) {
      state.user = action.payload?.user;
      state.isAuth = true;
    },
    logOut(state) {
      state.user = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
        state.formErrors = {};
        state.isError = false;
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.isLoading = false;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
        state.isError = true;
        console.log(action);
        state.formErrors = action.payload;
      });
  },
});

export const { authUser, logOut } = userReducer.actions;

export default userReducer.reducer;
