import axios from "axios";
import {
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
} from "../../constants/blogConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_DELETE_REQUEST,
    });
    await axios.delete(`/api/blog/${id}`);

    dispatch({
      type: BLOG_DELETE_SUCCESS,
    });
    dispatch(setAlert(`Blog Deleted`, "success"));
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
      type: BLOG_DELETE_FAIL,
      payload: message,
    });
  }
};
