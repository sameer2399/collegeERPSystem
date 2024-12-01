import { combineReducers } from "redux";
import { login, auth } from "./auth-reducers";
import { attendance, myClasses } from "./studentactions-reducers";
import { newEvent, admin, adminuser, eventattendance } from "./admin-reducers";
import { events, event, checkout, myBookings } from "./event-reducers";

// Combining all the reducers
export default combineReducers({
  login,
  auth,
  attendance,
  classes: myClasses,
  newEvent,
  events,
  event,
  checkout,
  myBookings,
  admin,
  adminuser,
  eventattendance,
});
