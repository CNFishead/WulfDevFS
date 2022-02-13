import axios from "axios";
import {
  CERTIFICATE_LIST_FAIL,
  CERTIFICATE_LIST_REQUEST,
  CERTIFICATE_LIST_SUCCESS,
} from "../../constants/certConstants";
import { setAlert } from "../alert";

export const listCertificates =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      // Dispatch request type
      dispatch({ type: CERTIFICATE_LIST_REQUEST });
      // axios call
      const { data } = await axios({
        method: "GET",
        url: `/api/certs?keyword=${keyword}&pageNumber=${pageNumber}`,
      });
      // on success dispatch request success
      dispatch({
        type: CERTIFICATE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CERTIFICATE_LIST_FAIL,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  };
