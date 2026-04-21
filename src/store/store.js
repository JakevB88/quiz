import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './quizSlice'; //import the defualt export from quizSlice.js
import resultsReducer from './resultsSlice';

export default configureStore({
  reducer: {
    quizzes: quizReducer,
    results: resultsReducer
  },
});
