import axios from "axios";
import {
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
} from "../../constants/blogConstants";
import { setAlert } from "../alert";
export const listBlogDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/blog/${id}`);
    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
