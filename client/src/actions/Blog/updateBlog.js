import axios from "axios";
import {
  BLOG_DETAILS_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
} from "../../constants/blogConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const updateBlog = (blog) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_UPDATE_REQUEST,
    });

    const { data } = await axios.put(`/api/blog/${blog._id}`, blog);
    dispatch({
      type: BLOG_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(setAlert(`Blog ${blog.blogTitle}, Updated!`, "success"));
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "danger"));
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message,
    });
  }
};
