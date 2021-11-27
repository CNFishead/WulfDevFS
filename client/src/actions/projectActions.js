import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "../constants/projectsContstants";
import axios from "axios";

export const listProjects = (pageNumber) => async (dispatch) => {
  try {
    // Dispatch request type
    dispatch({ type: PROJECT_LIST_REQUEST });
    // axios call
    const { data } = await axios({
      method: "GET",
      url: `/api/projects?page=${pageNumber}`,
    });
    // on success dispatch request success
    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
