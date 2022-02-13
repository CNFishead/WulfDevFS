import axios from "axios";
import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "../../constants/projectsContstants";
import { setAlert } from "../alert";

export const listProjects =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      // Dispatch request type
      dispatch({ type: PROJECT_LIST_REQUEST });
      // axios call
      const { data } = await axios({
        method: "GET",
        url: `/api/projects?keyword=${keyword}&pageNumber=${pageNumber}`,
      });
      // on success dispatch request success
      dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECT_LIST_FAIL,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  };
