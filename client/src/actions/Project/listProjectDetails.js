import axios from "axios";
import {
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
} from "../../constants/projectsContstants";
import { setAlert } from "../alert";

export const listProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/projects/${id}`);

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: message,
    });
  }
};
