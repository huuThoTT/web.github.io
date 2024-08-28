import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    getRating: {
      ratings: [], // Mảng chứa danh sách các đánh giá
      loading: false,
      error: false,
    },
    updateRating: {
      rating: null, // Đối tượng chứa đánh giá được cập nhật
      loading: false,
      error: false,
    },
  },
  reducers: {
    // Get Rating Reducers
    getRatingStart: (state) => {
      state.getRating.loading = true;
      state.getRating.error = false;
    },
    getRatingSuccess: (state, action) => {
      state.getRating.loading = false;
      state.getRating.ratings = action.payload;
    },
    getRatingFailed: (state) => {
      state.getRating.loading = false;
      state.getRating.error = true;
    },

    // Update Rating Reducers
    updateRatingStart: (state) => {
      state.updateRating.loading = true;
      state.updateRating.error = false;
    },
    updateRatingSuccess: (state, action) => {
      state.updateRating.loading = false;
      state.updateRating.rating = action.payload;
    },
    updateRatingFailed: (state) => {
      state.updateRating.loading = false;
      state.updateRating.error = true;
    },
  },
});

export const {
  getRatingStart,
  getRatingSuccess,
  getRatingFailed,
  updateRatingStart,
  updateRatingSuccess,
  updateRatingFailed,
} = ratingSlice.actions;

export default ratingSlice.reducer;
