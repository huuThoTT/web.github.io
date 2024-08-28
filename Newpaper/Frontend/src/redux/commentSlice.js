import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    getComment: {
      comments: [], // Mảng chứa danh sách các bình luận
      loading: false,
      error: false,
    },
    updateComment: {
      comment: null, // Đối tượng chứa bình luận được cập nhật
      loading: false,
      error: false,
    },
    deleteComment: {
      comment: null, // Đối tượng chứa bình luận sau khi xóa
      loading: false,
      error: false,
    },
  },
  reducers: {
    // Get Comment Reducers
    getCommentStart: (state) => {
      state.getComment.loading = true;
      state.getComment.error = false;
    },
    getCommentSuccess: (state, action) => {
      state.getComment.loading = false;
      state.getComment.comments = action.payload;
    },
    getCommentFailed: (state) => {
      state.getComment.loading = false;
      state.getComment.error = true;
    },

    // Update Comment Reducers
    updateCommentStart: (state) => {
      state.updateComment.loading = true;
      state.updateComment.error = false;
    },
    updateCommentSuccess: (state, action) => {
      state.updateComment.loading = false;
      state.updateComment.comment = action.payload;
    },
    updateCommentFailed: (state) => {
      state.updateComment.loading = false;
      state.updateComment.error = true;
    },

    // Delete Comment Reducers
    deleteCommentStart: (state) => {
      state.deleteComment.loading = true;
      state.deleteComment.error = false;
    },
    deleteCommentSuccess: (state, action) => {
      state.deleteComment.loading = false;
      state.deleteComment.comment = action.payload;
    },
    deleteCommentFailed: (state) => {
      state.deleteComment.loading = false;
      state.deleteComment.error = true;
    },
  },
});

export const {
  getCommentStart,
  getCommentSuccess,
  getCommentFailed,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
} = commentSlice.actions;

export default commentSlice.reducer;
