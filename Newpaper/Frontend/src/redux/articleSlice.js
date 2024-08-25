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
} = articleSlice.actions;

export default articleSlice.reducer;
