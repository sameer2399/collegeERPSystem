import {
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAILURE,
  NEW_EVENT_CLEAR,
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAILURE,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_FAILURE,
  ADMIN_USER_FILTER,
  SELECT_AUID_FOR_BOOKINGS,
  ADMIN_CLEAR_AUID,
  CHANGE_EVENT_STATUS,
  FETCH_ATTENDANCE_REQUEST,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
  MARK_ATTENDANCE_CLEAR,
  SET_EVENT_ID_FOR_ATTENDANCE,
} from "../Constants/admin-constants";

export const newEvent = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case NEW_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Event Added Successfully",
      };
    case NEW_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case NEW_EVENT_CLEAR:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
      };
    default:
      return state;
  }
};

export const admin = (
  state = {
    loading: false,
    success: false,
    message: "",
    data: {},
    error: false,
    selectedAuid: "",
  },
  action
) => {
  switch (action.type) {
    case ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: "Access Granted",
        data: action.payload,
      };
    case ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case SELECT_AUID_FOR_BOOKINGS:
      return {
        ...state,
        selectedAuid: action.payload,
      };
    case ADMIN_CLEAR_AUID:
      return {
        ...state,
        selectedAuid: "",
      };

    default:
      return state;
  }
};

export const adminuser = (
  state = {
    loading: false,
    success: false,
    message: "",
    data: {},
    error: false,
  },
  action
) => {
  switch (action.type) {
    case ADMIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: "Access Granted",
        data: action.payload,
      };
    case ADMIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case CHANGE_EVENT_STATUS:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, status: action.payload.status };
          }
          return item;
        }),
      };

    case ADMIN_USER_FILTER:
      if (action.payload.method === "filter") {
        return {
          ...state,
          data: state.data.filter((item) => {
            return item.auid !== action.payload.auid;
          }),
        };
      }
      if (action.payload.method === "modify") {
        return {
          ...state,
          data: state.data.map((item) => {
            if (item.auid === action.payload.auid) {
              return { ...item, role: action.payload.role };
            }
            return item;
          }),
        };
      }
      if (action.payload.method === "add") {
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      }
      break;

    default:
      return state;
  }
};

export const eventattendance = (
  state = {
    loading: false,
    success: false,
    message: "",
    data: [],
    error: false,
    selectedEvent: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: "Access Granted",
        data: action.payload,
      };
    case FETCH_ATTENDANCE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case SET_EVENT_ID_FOR_ATTENDANCE:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    case MARK_ATTENDANCE_CLEAR:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        message: "",
        data: [],
        selectedAuid: {},
      };
    default:
      return state;
  }
};
