import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
//npm install axios
import {
  getArticleStart,
  getArticleSuccess,
  getArticleFailed,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailed,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailed,
} from "./articleSlice";

import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailed,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailed,
}from "./categorySlice"

import {
  getTagStart,
  getTagSuccess,
  getTagFailed,
  updateTagStart,
  updateTagSuccess,
  updateTagFailed,
  deleteTagStart,
  deleteTagSuccess,
  deleteTagFailed,
}from "./tagSlice"
//Auth
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

//User
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

//Article
export const getArticle = async (dispatch) =>{
   dispatch(getArticleStart());
   try{
    const res= await axios.get("/v1/article/getArticle");
    dispatch(getArticleSuccess(res.data));
   }catch(err){
    dispatch(getArticleFailed());
   }

};
export const updateArticle = async (dispatch,article) =>{
  dispatch(updateArticleStart());
  try{
   const res= await axios.post("/v1/article/updateArticle",article);
   dispatch(updateArticleSuccess(res.data));
  }catch(err){
   dispatch(updateArticleFailed());
  }

};
export const deleteArticle = async (dispatch,id,) =>{
  dispatch(deleteArticleStart());
  try{
   const res= await axios.delete("/v1/article/"+ id);
   dispatch(deleteArticleSuccess(res.data));
  }catch(err){
   dispatch(deleteArticleFailed());
  }
};
//Category
export const getCategories = async (dispatch)=>{
  dispatch(getCategoryStart());
  try{
   const res= await axios.get("/v1/category/getCategory");
   dispatch(getCategorySuccess(res.data));
  }catch(err){
   dispatch(getCategoryFailed());
  }
}
export const updateCategory = async (dispatch,category) =>{
  dispatch(updateCategoryStart());
  try{
   const res= await axios.post("/v1/category/updateCategory",category);
   dispatch(updateCategorySuccess(res.data));
  }catch(err){
   dispatch(updateCategoryFailed());
  }

};
export const deleteCategory = async (dispatch,id,) =>{
  dispatch(deleteCategoryStart());
  try{
   const res= await axios.delete("/v1/category/"+ id);
   dispatch(deleteCategorySuccess(res.data));
  }catch(err){
   dispatch(deleteCategoryFailed());
  }
};

//Tags
export const getTags = async (dispatch) => {
  dispatch(getTagStart());
  try {
    const res = await axios.get("/v1/tag/getTag");
    dispatch(getTagSuccess(res.data));
  } catch (err) {
    dispatch(getTagFailed());
  }
};

export const updateTag = async (dispatch, tag) => {
  dispatch(updateTagStart());
  try {
    const res = await axios.post("/v1/tag/updateTag", tag);
    dispatch(updateTagSuccess(res.data));
  } catch (err) {
    dispatch(updateTagFailed());
  }
};

export const deleteTag = async (dispatch, id) => {
  dispatch(deleteTagStart());
  try {
    const res = await axios.delete(`/v1/tag/deleteTag/${id}`);
    dispatch(deleteTagSuccess(res.data));
  } catch (err) {
    dispatch(deleteTagFailed());
  }
};