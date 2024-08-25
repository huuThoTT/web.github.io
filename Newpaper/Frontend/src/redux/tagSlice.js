import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    getTag: {
      tags: [], // Mảng chứa danh sách các tag
      loading: false,
      error: false,
    },
    updateTag: {
      tag: null, // Đối tượng tag mới được cập nhật
      loading: false,
      error: false,
    },
    deleteTag: {
      tags: [], // Mảng chứa danh sách các tag sau khi xóa
      loading: false,
      error: false,
    },
  },
  reducers: {
    getTagStart: (state) => {
      state.getTag.loading = true;
      state.getTag.error = false;
    },
    getTagSuccess: (state, action) => {
      state.getTag.loading = false;
      state.getTag.tags = action.payload;
    },
    getTagFailed: (state) => {
      state.getTag.loading = false;
      state.getTag.error = true;
    },
    updateTagStart: (state) => {
      state.updateTag.loading = true;
      state.updateTag.error = false;
    },
    updateTagSuccess: (state, action) => {
      state.updateTag.loading = false;
      state.updateTag.tag = action.payload;
    },
    updateTagFailed: (state) => {
      state.updateTag.loading = false;
      state.updateTag.error = true;
    },
    deleteTagStart: (state) => {
      state.deleteTag.loading = true;
      state.deleteTag.error = false;
    },
    deleteTagSuccess: (state, action) => {
      state.deleteTag.loading = false;
      state.deleteTag.tags = action.payload;
    },
    deleteTagFailed: (state) => {
      state.deleteTag.loading = false;
      state.deleteTag.error = true;
    },
  },
});

export const {
  getTagStart,
  getTagSuccess,
  getTagFailed,
  updateTagStart,
  updateTagSuccess,
  updateTagFailed,
  deleteTagStart,
  deleteTagSuccess,
  deleteTagFailed,
} = tagSlice.actions;

export default tagSlice.reducer;
