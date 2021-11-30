import {
  CERTIFICATE_CREATE_FAIL,
  CERTIFICATE_CREATE_REQUEST,
  CERTIFICATE_CREATE_SUCCESS,
  CERTIFICATE_DELETE_FAIL,
  CERTIFICATE_DELETE_REQUEST,
  CERTIFICATE_DELETE_SUCCESS,
  CERTIFICATE_DETAILS_FAIL,
  CERTIFICATE_DETAILS_REQUEST,
  CERTIFICATE_DETAILS_SUCCESS,
  CERTIFICATE_LIST_FAIL,
  CERTIFICATE_LIST_REQUEST,
  CERTIFICATE_LIST_SUCCESS,
  CERTIFICATE_UPDATE_FAIL,
  CERTIFICATE_UPDATE_REQUEST,
  CERTIFICATE_UPDATE_SUCCESS,
} from "../constants/certConstants";
import { logout } from "./userActions";
import axios from "axios";

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
      console.log(data);
      // on success dispatch request success
      dispatch({
        type: CERTIFICATE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CERTIFICATE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCertificateDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CERTIFICATE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/certs/${id}`, config);

    dispatch({
      type: CERTIFICATE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CERTIFICATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCertificate = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERTIFICATE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/certs/${id}`, config);

    dispatch({
      type: CERTIFICATE_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CERTIFICATE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createCertificate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERTIFICATE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/certs`,
      {
        name: "blank certificate",
        issuingAuthority:
          "This is a blank Certificate, pardon my dust as i clean up",
      },
      config
    );

    dispatch({
      type: CERTIFICATE_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CERTIFICATE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateCertificate =
  (certificate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CERTIFICATE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/certs/${certificate._id}`,
        certificate,
        config
      );

      dispatch({
        type: CERTIFICATE_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: CERTIFICATE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CERTIFICATE_UPDATE_FAIL,
        payload: message,
      });
    }
  };
