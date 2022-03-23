import axios from "axios";
import {
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
} from "../../constants/blogConstants";
import { setAlert } from "../alert";

export const getFeaturedArticles = () => async (dispatch) => {
  try {
    // Dispatch request type
    dispatch({ type: BLOG_LIST_REQUEST });
    // axios call
    const { data } = await axios({
      method: "GET",
      url: `/api/blog/featured`,
    });
    // on success dispatch request success
    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_LIST_FAIL,
      payload: message,
    });
    dispatch(setAlert(`Problem getting blogs from DB: ${message}`, "danger"));
  }
};
