import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  SETUP_CHECKOUT_REQUEST,
  SETUP_CHECKOUT_SUCCESS,
  SETUP_CHECKOUT_SUCCESS2,
  SETUP_CHECKOUT_FAILURE,
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAILURE,
} from "../Constants/event-constants";
import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import { headerConfig } from "../../Utils/headerConfig";
export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_EVENTS_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/events/all-events`,
      headers: headerConfig(),
    });
    if (!data.success) {
      dispatch({
        type: FETCH_EVENTS_FAILURE,
        payload: data.message,
      });
      return false;
    }
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: error.message,
    });
    return false;
  }
};

export const fetchEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_EVENT_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/events/event/${id}`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: FETCH_EVENT_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: FETCH_EVENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EVENT_FAILURE,
      payload: error.message,
    });
  }
};

export const initializeCheckout = (eventId) => async (dispatch) => {
  try {
    dispatch({
      type: SETUP_CHECKOUT_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/events/init/checkout`,
      headers: headerConfig(),
      data: {
        eventId,
      },
    });
    if (!data.success) {
      return dispatch({
        type: SETUP_CHECKOUT_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: SETUP_CHECKOUT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SETUP_CHECKOUT_FAILURE,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

export const fetchCheckout = (checkoutId) => async (dispatch) => {
  try {
    dispatch({
      type: SETUP_CHECKOUT_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/events/checkout/${checkoutId}`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: SETUP_CHECKOUT_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: SETUP_CHECKOUT_SUCCESS2,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SETUP_CHECKOUT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUserEachOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: SETUP_CHECKOUT_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/events/order/${orderId}`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: SETUP_CHECKOUT_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: SETUP_CHECKOUT_SUCCESS2,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SETUP_CHECKOUT_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_MY_ORDERS_REQUEST,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/events/my-bookings`,
      headers: headerConfig(),
    });
    if (!data.success) {
      return dispatch({
        type: FETCH_MY_ORDERS_FAILURE,
        payload: data.message,
      });
    }
    dispatch({
      type: FETCH_MY_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MY_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
