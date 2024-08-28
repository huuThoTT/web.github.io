import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser:null,
            isFetching: false,
            error:false
        },
        register:{
            isFetching: false,
            error:false,
            success:false
        },
    },
    reducers:{
        loginStart: (state) =>{
            state.login.isFetching = true;
        },
        loginSuccess: (state,action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        
    updateBookmarkedArticles: (state, action) => {
        if (state.login.currentUser) {
            // Sử dụng Set để loại bỏ các id trùng lặp
            const currentBookmarks = new Set(state.login.currentUser.bookmarkedArticles || []);
            const newBookmarks = new Set(action.payload);
            
            // Kết hợp các bookmark hiện tại với các bookmark mới
            const updatedBookmarks = [...new Set([...currentBookmarks, ...newBookmarks])];
            
            state.login.currentUser.bookmarkedArticles = updatedBookmarks;
        }
    },
        loginFailed: (state) =>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) =>{
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) =>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailed: (state) =>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutStart: (state) =>{
            state.login.isFetching = true;
        },
     
    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    updateBookmarkedArticles
} = authSlice.actions;

export default authSlice.reducer;

