import {
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAILURE,
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAILURE,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_FAILURE,
  ADMIN_USER_FILTER,
  CHANGE_EVENT_STATUS,
  FETCH_ATTENDANCE_REQUEST,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
} from "../Constants/admin-constants";
import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import { headerConfig } from "../../Utils/headerConfig";

export const newEvent = (event) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_EVENT_REQUEST,
    });
    const { data } = await axios({
      method: "post",
      url: `${baseUrl}/admin/add-event`,
      headers: headerConfig(),
      data: event,
    });
    if (!data.success) {
      dispatch({
        type: NEW_EVENT_FAILURE,
        payload: data.message,
      });
      return false;
    }
    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const fetchAdminPage = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/admin/home`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAdminUser = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/admin/users`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_USER_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAdminModsAndAdmins = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/admin/admins`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_USER_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeAdminOrMods = (payload, toast) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/admin/admins/action`,
      headers: headerConfig(),
      data: payload,
    });
    if (payload?.isNew) {
      dispatch({
        type: ADMIN_USER_FILTER,
        payload: {
          method: "add",
          auid: payload.auid,
          role: payload.role,
        },
      });
    }
    if (payload.role === "STUDENT") {
      dispatch({
        type: ADMIN_USER_FILTER,
        payload: {
          method: "filter",
          auid: payload.auid,
        },
      });
    } else {
      dispatch({
        type: ADMIN_USER_FILTER,
        payload: {
          method: "modify",
          auid: payload.auid,
          role: payload.role,
        },
      });
    }
    toast({
      title: data.message,
      status: `${data.success ? "success" : "error"}`,
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
  } catch (error) {
    toast({
      title: "Something went wrong",
      description:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
    return false;
  }
};

export const fetchEachUserBooking = (auid) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/admin/user/bookings`,
      headers: headerConfig(),
      data: { auid },
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchEventParticipants = (eventId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/admin/event/participants`,
      headers: headerConfig(),
      data: { eventId },
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchEventsForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/admin/events`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: ADMIN_USER_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: ADMIN_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEventStatus = (payload, toast) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/admin/event/status`,
      headers: headerConfig(),
      data: payload,
    });
    dispatch({
      type: CHANGE_EVENT_STATUS,
      payload: { id: payload.eventId, status: payload.status },
    });
    toast({
      title: data.message,
      status: `${data.success ? "success" : "error"}`,
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
  } catch (error) {
    toast({
      title: "Something went wrong",
      description:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
    return false;
  }
};

export const fetchEventAttendees = (eventId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ATTENDANCE_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/admin/event/attendance/${eventId}`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: FETCH_ATTENDANCE_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: FETCH_ATTENDANCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ATTENDANCE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const submitAttendance = (payload, toast) => async (dispatch) => {
  try {
    // dispatch({
    //   type: SUBMIT_ATTENDANCE_REQUEST,
    // });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/admin/event/attendance/submit`,
      headers: headerConfig(),
      data: payload,
    });
    // dispatch({
    //   type: SUBMIT_ATTENDANCE_SUCCESS,
    //   payload: data.data,
    // });
    toast({
      title: data.message,
      status: `${data.success ? "success" : "error"}`,
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
    return data.success;
  } catch (error) {
    toast({
      title: "Something went wrong",
      description:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
    return false;
  }
};
