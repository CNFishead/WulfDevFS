import axios from "axios";
import {
  CERTIFICATE_DETAILS_SUCCESS,
  CERTIFICATE_UPDATE_FAIL,
  CERTIFICATE_UPDATE_REQUEST,
  CERTIFICATE_UPDATE_SUCCESS,
} from "../../constants/certConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const updateCertificate = (certificate) => async (dispatch) => {
  try {
    dispatch({
      type: CERTIFICATE_UPDATE_REQUEST,
    });
    const { data } = await axios.put(
      `/api/certs/${certificate._id}`,
      certificate
    );

    dispatch({
      type: CERTIFICATE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: CERTIFICATE_DETAILS_SUCCESS, payload: data });
    dispatch(
      setAlert(`Certificate ${certificate.name}, has been updated`, "success")
    );
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
      type: CERTIFICATE_UPDATE_FAIL,
      payload: message,
    });
  }
};
