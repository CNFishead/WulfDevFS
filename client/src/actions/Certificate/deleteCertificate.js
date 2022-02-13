import axios from "axios";
import {
  CERTIFICATE_DELETE_FAIL,
  CERTIFICATE_DELETE_REQUEST,
  CERTIFICATE_DELETE_SUCCESS,
} from "../../constants/certConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const deleteCertificate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CERTIFICATE_DELETE_REQUEST,
    });
    await axios.delete(`/api/certs/${id}`);

    dispatch({
      type: CERTIFICATE_DELETE_SUCCESS,
    });
    dispatch(setAlert("Certificate Removed", "success"));
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
      type: CERTIFICATE_DELETE_FAIL,
      payload: message,
    });
  }
};
