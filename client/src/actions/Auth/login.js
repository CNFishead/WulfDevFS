import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../constants/userConstants";
import { setAlert } from "../alert";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post("/api/auth/login", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Login Successful", "success"));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
