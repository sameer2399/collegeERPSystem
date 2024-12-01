import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./Components";
import {
  AddEvent,
  Attendence,
  Classes,
  Developers,
  Error,
  Event,
  EventPage,
  Home,
  Login,
  Profile,
  Checkout,
  CheckoutMain,
  MyBookings,
  OrderConfirmation,
  Admin,
  JoinCommunity,
  AdminUsers,
  AdminAdmins,
  AdminEvents,
} from "./Pages";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "./Redux/Actions";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import {
  AdminAndModRoutes,
  GuestRoutes,
  ProtectedRoutes,
  CheckOutRoutes,
  AdminRoutes,
} from "./Utils/customRoutes";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") ? true : false;
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="events" element={<Event />} />
        <Route path="events/:eventId" element={<EventPage />} />
        <Route path="developers" element={<Developers />} />
        <Route path="*" element={<Error />} />
        <Route element={<CheckOutRoutes />}>
          <Route path="checkout" element={<CheckoutMain />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="orderStatus/:orderId" element={<OrderConfirmation />} />
          <Route path="checkout/:checkOutId" element={<Checkout />} />
          <Route path="attendance" element={<Attendence />} />
          <Route path="profile" element={<Profile />} />
          <Route path="class" element={<Classes />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="join-community" element={<JoinCommunity />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<AdminAndModRoutes />}>
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route path="/admin/home" element={<Admin />} />
          <Route path="/admin/events" element={<AdminEvents />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/admins" element={<AdminAdmins />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
