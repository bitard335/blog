import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './reducers/articlesReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});
