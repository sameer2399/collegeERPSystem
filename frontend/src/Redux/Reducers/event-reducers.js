import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  SETUP_CHECKOUT_EVENTID,
  SETUP_CHECKOUT_REQUEST,
  SETUP_CHECKOUT_SUCCESS,
  SETUP_CHECKOUT_SUCCESS2,
  SETUP_CHECKOUT_FAILURE,
  CLEAR_CHECKOUT,
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAILURE,
} from "../Constants/event-constants";

export const events = (
  state = { loading: true, success: false, message: "", events: [] },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Events Fetched Successfully",
        events: action.payload,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const event = (
  state = { loading: true, success: false, message: "", event: {} },
  action
) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Event Fetched Successfully",
        event: action.payload,
      };
    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const checkout = (
  state = {
    loading: true,
    success: false,
    error: "",
    message: "",
    eventId: "",
    checkout: {},
  },
  action
) => {
  switch (action.type) {
    case SETUP_CHECKOUT_EVENTID:
      return {
        ...state,
        eventId: action.payload,
      };
    case SETUP_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SETUP_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: true,
        success: true,
        message: "Checkout Setup Successfully",
        checkout: action.payload,
        error: false,
      };
    case SETUP_CHECKOUT_SUCCESS2:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Checkout Setup Successfully",
        checkout: action.payload,
        error: false,
      };
    case SETUP_CHECKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
        error: true,
      };
    case CLEAR_CHECKOUT:
      return {
        ...state,
        checkout: {},
        loading: false,
        success: false,
        message: "",
        eventId: "",
        error: false,
      };
    default:
      return state;
  }
};

export const myBookings = (
  state = { loading: true, success: false, message: "", bookings: [] },
  action
) => {
  switch (action.type) {
    case FETCH_MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Bookings Fetched Successfully",
        bookings: action.payload,
      };
    case FETCH_MY_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
