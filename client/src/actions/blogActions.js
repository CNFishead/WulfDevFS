import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  // eslint-disable-next-line
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  // eslint-disable-next-line
  BLOG_UPDATE_RESET,
  BLOG_UPDATE_SUCCESS,
} from "../constants/blogConstants";
import { logout } from "./userActions";
import axios from "axios";

export const listBlogs =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      // Dispatch request type
      dispatch({ type: BLOG_LIST_REQUEST });
      // axios call
      const { data } = await axios({
        method: "GET",
        url: `/api/blog?keyword=${keyword}&pageNumber=${pageNumber}`,
      });
      // on success dispatch request success
      dispatch({
        type: BLOG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listBlogDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/blog/${id}`, config);

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blog/${id}`, config);

    dispatch({
      type: BLOG_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createBlog =
  ({ blogTitle, content }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOG_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/blog`,
        {
          blogTitle,
          content,
        },
        config
      );

      dispatch({
        type: BLOG_CREATE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: BLOG_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateBlog = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/blog/${project._id}`,
      project,
      config
    );

    dispatch({
      type: BLOG_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message,
    });
  }
};
