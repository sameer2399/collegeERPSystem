export const itemsForAdminsMenu = [
  {
    name: "Make Moderator",
    params: "MODERATOR",
    role: "ADMIN",
  },
  {
    name: "Remove Admin",
    params: "STUDENT",
    role: "ADMIN",
  },
  {
    name: "Make Admin",
    params: "ADMIN",
    role: "MODERATOR",
  },
  {
    name: "Remove Moderator",
    params: "STUDENT",
    role: "MODERATOR",
  },
];

export const itemsForUserMenu = [
  {
    name: "View Bookings",
    params: "VIEW_ORDERS",
    role: "STUDENT",
  },
  {
    name: "Make Admin",
    params: "ADMIN",
    role: "ADMIN",
  },
  {
    name: "Make Moderator",
    params: "MODERATOR",
    role: "MODERATOR",
  },
  {
    name: "Ban User",
    params: "BAN",
    role: "BANNED",
  },
];

export const menuForEvents = [
  {
    name: "View Event",
    params: "VIEW_EVENT",
    role: "",
  },
  {
    name: "View Bookings",
    params: "VIEW_ORDERS",
    role: "",
  },
  {
    name: "Mark Attendance",
    params: "MARK_ATTENDANCE",
    role: "active",
  },
  {
    name: "Cancel Event",
    params: "CANCEL_EVENT",
    role: "active",
  },
  {
    name: "Mark Completed",
    params: "MARK_COMPLETED",
    role: "active",
  },
];
