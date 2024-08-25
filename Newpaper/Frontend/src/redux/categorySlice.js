import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    getCategory: {
      categories: [], // Mảng chứa danh sách các danh mục
      loading: false,
      error: false,
    },
    updateCategory: {
      categories: null, // Mảng chứa danh sách các danh mục (có thể là đối tượng danh mục mới được cập nhật)
      loading: false,
      error: false,
    },
    deleteCategory: {
      categories: null, // Mảng chứa danh sách các danh mục (có thể là danh sách danh mục sau khi xóa)
      loading: false,
      error: false,
    },
  },
  reducers: {
    // Get Category Reducers
    getCategoryStart: (state) => {
      state.getCategory.loading = true;
      state.getCategory.error = false;
    },
    getCategorySuccess: (state, action) => {
      state.getCategory.loading = false;
      state.getCategory.categories = action.payload;
    },
    getCategoryFailed: (state) => {
      state.getCategory.loading = false;
      state.getCategory.error = true;
    },

    // Update Category Reducers
    updateCategoryStart: (state) => {
      state.updateCategory.loading = true;
      state.updateCategory.error = false;
    },
    updateCategorySuccess: (state, action) => {
      state.updateCategory.loading = false;
      state.updateCategory.categories = action.payload;
    },
    updateCategoryFailed: (state) => {
      state.updateCategory.loading = false;
      state.updateCategory.error = true;
    },

    // Delete Category Reducers
    deleteCategoryStart: (state) => {
      state.deleteCategory.loading = true;
      state.deleteCategory.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.deleteCategory.loading = false;
      state.deleteCategory.categories = action.payload;
    },
    deleteCategoryFailed: (state) => {
      state.deleteCategory.loading = false;
      state.deleteCategory.error = true;
    },
  },
});

export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailed,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailed,
} = categorySlice.actions;

export default categorySlice.reducer;
