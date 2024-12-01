import {
  FETCH_STUDENT_ATTENDANCE,
  FETCH_STUDENT_ATTENDANCE_SUCCESS,
  FETCH_STUDENT_ATTENDANCE_FAILURE,
  FETCH_STUDENT_CLASSES,
  FETCH_STUDENT_CLASSES_SUCCESS,
  FETCH_STUDENT_CLASSES_FAILURE,
} from "../Constants/studentactions-constants";
import axios from "axios";
import { headerConfig } from "../../Utils/headerConfig";
import baseUrl from "../../Utils/baseurl";

export const fetchAttendance = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_STUDENT_ATTENDANCE,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/attendance`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: FETCH_STUDENT_ATTENDANCE_FAILURE,
        payload: data.message,
      });
    }
    return dispatch({
      type: FETCH_STUDENT_ATTENDANCE_SUCCESS,
      payload: data.attendence,
    });
  } catch (error) {
    return dispatch({
      type: FETCH_STUDENT_ATTENDANCE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchClasses = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_STUDENT_CLASSES,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/classes`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: FETCH_STUDENT_CLASSES_FAILURE,
        payload: data.message,
      });
    }
    return dispatch({
      type: FETCH_STUDENT_CLASSES_SUCCESS,
      payload: {
        onlineClasses: data.onlineClasses,
        offlineClasses: data.offlineClasses,
      },
    });
  } catch (error) {
    return dispatch({
      type: FETCH_STUDENT_CLASSES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
