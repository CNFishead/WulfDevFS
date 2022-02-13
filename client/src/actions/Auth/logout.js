import { USER_LOGOUT } from "../../constants/userConstants";
import { setAlert } from "../alert";

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch(setAlert(`Logout Successful`, "success"));
};
