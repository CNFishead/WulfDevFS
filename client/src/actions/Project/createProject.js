import axios from "axios";
import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
} from "../../constants/projectsContstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";

export const createProject = () => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST,
    });
    const { data } = await axios.post(`/api/projects`, {
      name: "blank project",
      description: "This is a blank project, pardon my dust as i clean up",
    });

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: data.data,
    });
    dispatch(setAlert(`Project Created`, "success"));
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
      type: PROJECT_CREATE_FAIL,
      payload: message,
    });
  }
};
