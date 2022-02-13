import axios from "axios";
import {
  CERTIFICATE_DETAILS_FAIL,
  CERTIFICATE_DETAILS_REQUEST,
  CERTIFICATE_DETAILS_SUCCESS,
} from "../../constants/certConstants";
import { setAlert } from "../alert";

export const listCertificateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CERTIFICATE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/certs/${id}`);
    dispatch({
      type: CERTIFICATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CERTIFICATE_DETAILS_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
