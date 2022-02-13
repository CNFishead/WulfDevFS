import axios from "axios";
import {
  CERTIFICATE_CREATE_FAIL,
  CERTIFICATE_CREATE_REQUEST,
  CERTIFICATE_CREATE_SUCCESS,
} from "../../constants/certConstants";
import { setAlert } from "../alert";
import { logout } from "../Auth/logout";
export const createCertificate = () => async (dispatch) => {
  try {
    dispatch({
      type: CERTIFICATE_CREATE_REQUEST,
    });
    const { data } = await axios.post(`/api/certs`, {
      name: "blank certificate",
      issuingAuthority:
        "This is a blank Certificate, pardon my dust as i clean up",
    });

    dispatch({
      type: CERTIFICATE_CREATE_SUCCESS,
      payload: data.data,
    });
    dispatch(setAlert("Certificate Created", "success"));
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
      type: CERTIFICATE_CREATE_FAIL,
      payload: message,
    });
  }
};
