import {
  FETCH_STUDENT_ATTENDANCE,
  FETCH_STUDENT_ATTENDANCE_SUCCESS,
  FETCH_STUDENT_ATTENDANCE_FAILURE,
  FETCH_STUDENT_CLASSES,
  FETCH_STUDENT_CLASSES_SUCCESS,
  FETCH_STUDENT_CLASSES_FAILURE,
} from "../Constants/studentactions-constants";

export const attendance = (
  state = {
    loading: false,
    success: false,
    error: false,
    message: "",
    attendance: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_STUDENT_ATTENDANCE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STUDENT_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        attendance: action.payload,
      };
    case FETCH_STUDENT_ATTENDANCE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const myClasses = (
  state = {
    loading: false,
    success: false,
    error: false,
    message: "",
    classes: {
      onlineClasses: [],
      offlineClasses: [],
    },
  },
  action
) => {
  switch (action.type) {
    case FETCH_STUDENT_CLASSES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STUDENT_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        classes: action.payload,
      };
    case FETCH_STUDENT_CLASSES_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    default:
      return state;
  }
};
