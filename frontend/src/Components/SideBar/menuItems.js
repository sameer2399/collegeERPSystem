import {
  StylishDashboardIcon,
  StylishUsersIcon,
  StylishEventIcon,
  StylishSuperUserIcon,
  StylishPaymentIcon,
  StylishCommunityIcon,
} from "..";

export const menuItems = [
  {
    name: "Dashboard",
    url: "/admin/home",
    icon: StylishDashboardIcon,
    role: "ADMIN",
  },
  {
    name: "Students",
    url: "/admin/users",
    icon: StylishUsersIcon,
    role: "ADMIN",
  },
  {
    name: "Events",
    url: "/admin/events",
    icon: StylishEventIcon,
    role: "ADMIN",
  },
  {
    name: "Admins",
    url: "/admin/admins",
    icon: StylishSuperUserIcon,
    role: "ADMIN",
  },
  {
    name: "Community",
    url: "/admin/community",
    icon: StylishCommunityIcon,
    role: "ADMIN",
  },
  {
    name: "Payments",
    url: "/admin/payments",
    icon: StylishPaymentIcon,
    role: "ADMIN",
  },
  {
    name: "Dashboard",
    url: "/admin/home",
    icon: StylishDashboardIcon,
    role: "MODERATOR",
  },
  {
    name: "Your Events",
    url: "/admin/events",
    icon: StylishEventIcon,
    role: "MODERATOR",
  },
];
