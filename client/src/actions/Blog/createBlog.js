import axios from "axios";
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
} from "../../constants/blogConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const createBlog = (blog) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_CREATE_REQUEST,
    });
    const { data } = await axios.post(`/api/blog`, blog);

    dispatch({
      type: BLOG_CREATE_SUCCESS,
      payload: data.data,
    });
    dispatch(setAlert(`Blog ${blog.blogTitle} created!`, "success"));
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
      type: BLOG_CREATE_FAIL,
      payload: message,
    });
  }
};
