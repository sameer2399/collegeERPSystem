import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  CLEAR_LOGIN_DATA,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
  USER_LOGOUT,
} from "../Constants/auth-constants";

export const login = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        message: "",
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Login Successful",
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case CLEAR_LOGIN_DATA:
      return {
        loading: false,
        success: false,
        message: "",
      };
    default:
      return state;
  }
};

const authInititalState = {
  isAuthenticated: false,
  loading: localStorage.getItem("token") ? true : false,
  user: {},
};
export const auth = (state = authInititalState, action) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case USER_LOAD_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};
