import axios from "axios";
import {
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
} from "../../constants/projectsContstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    });
    await axios.delete(`/api/projects/${id}`);

    dispatch({
      type: PROJECT_DELETE_SUCCESS,
    });
    dispatch(setAlert(`Project ${id} has been removed`, "success"));
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
      type: PROJECT_DELETE_FAIL,
      payload: message,
    });
  }
};
