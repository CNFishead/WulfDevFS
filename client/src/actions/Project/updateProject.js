import axios from "axios";
import {
  PROJECT_DETAILS_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
} from "../../constants/projectsContstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const updateProject = (project) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST,
    });
    const { data } = await axios.put(`/api/projects/${project._id}`, project);

    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
    dispatch(setAlert(`Project Updated`, "success"));
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
      type: PROJECT_UPDATE_FAIL,
      payload: message,
    });
  }
};
