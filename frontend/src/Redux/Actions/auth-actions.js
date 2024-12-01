import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
  USER_LOGOUT,
  CLEAR_LOGIN_DATA,
} from "../Constants/auth-constants";
import { headerConfig } from "../../Utils/headerConfig";

export const loginAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post(`${baseUrl}/auth/login`, payload);
    if (!data.success) {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: data.message,
      });
      return false;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("aliveToken", data.aliveToken);
    localStorage.setItem("Oauth", data.Oauth);
    dispatch({
      type: USER_LOGIN_SUCCESS,
    });
    return true;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOAD_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/auth/profile`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: USER_LOAD_FAILURE,
        payload: data.message,
      });
      return false;
    }
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAILURE,
      payload: "Server Error, Please try again later.",
    });
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("aliveToken");
  localStorage.removeItem("Oauth");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: CLEAR_LOGIN_DATA,
  });
};
