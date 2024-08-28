import { createSlice } from "@reduxjs/toolkit";
import { updateArticle } from "./apiRequest";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    getArticle: {
      articles: [],
      loading: false,
      error: false,
    },
    updateArticle: {
      articles: null,
      loading: false,
      error: false,
    },
    deleteArticle: {
      articles: null,
      loading: false,
      error: false,
    },
    getArticlePending: {
      articlesPending: [],
      loading: false,
      error: false,
    },
    updateArticlePending: {
      articlesPending: null,
      loading: false,
      error: false,
    },
   
  },
  reducers: {
    getArticleStart: (state) => {
      state.getArticle.loading = true;
      state.getArticle.error = false;
    },
    getArticleSuccess: (state, action) => {
      state.getArticle.loading = false;
      state.getArticle.articles = action.payload;
    },
    getArticleFailed: (state) => {
      state.getArticle.loading = false;
      state.getArticle.error = true;
    },
    updateArticleStart: (state) => {
      state.updateArticle.loading = true;
      state.updateArticle.error = false;
    },
    updateArticleSuccess: (state, action) => {
      state.updateArticle.loading = false;
      state.updateArticle.articles = action.payload;
    },
    updateArticleFailed: (state) => {
      state.updateArticle.loading = false;
      state.updateArticle.error = true;
    },
    deleteArticleStart: (state) => {
      state.deleteArticle.loading = true;
      state.deleteArticle.error = false;
    },
    deleteArticleSuccess: (state, action) => {
      state.deleteArticle.loading = false;
      state.deleteArticle.articles = action.payload;
    },
    deleteArticleFailed: (state) => {
      state.deleteArticle.loading = false;
      state.deleteArticle.error = true;
    },

    getArticlePendingStart: (state) => {

    },
    getArticlePendingSuccess: (state, action) => {
      state.getArticlePending.loading = false;
      state.getArticlePending.articlesPending = action.payload;
    },
    getArticlePendingFailed: (state) => {
      
    },
    updateArticlePendingStart: (state) => {
      state.updateArticlePending.loading = true;
      state.updateArticlePending.error = false;
    },
    updateArticlePendingSuccess: (state, action) => {
      state.updateArticlePending.loading = false;
      state.updateArticlePending.articlesPending = action.payload;
    },
    updateArticlePendingFailed: (state) => {
      state.updateArticlePending.loading = false;
      state.updateArticlePending.error = true;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailed,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailed,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailed,
  getArticlePendingStart,
  getArticlePendingSuccess,
  getArticlePendingFailed,
  updateArticlePendingStart,
  updateArticlePendingSuccess,
  updateArticlePendingFailed,
} = articleSlice.actions;

export default articleSlice.reducer;
