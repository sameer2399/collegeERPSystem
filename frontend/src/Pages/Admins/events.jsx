import {
  Box,
  Button,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonQuickAction, ErrorMessage, SideBar } from "../../Components";
import { fetchEventsForAdmin, updateEventStatus } from "../../Redux/Actions";
import { BookingStatus } from "./Components/Bookings/status";
import { menuForEvents as Menu } from "./Utils/menus";
import moment from "moment";
import { ViewParticipants } from "./Components/Bookings/participants";
import { MarkAttendance } from "./Components/Attendance/attendance";
const AdminEvents = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [clickTyped, setClickTyped] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, success, data, error, message } = useSelector(
    (state) => state.adminuser
  );
  useEffect(() => {
    dispatch(fetchEventsForAdmin());
  }, []);

  const getItemsForMenu = (name) => {
    const items = Menu.filter((item) => {
      if (!item.role) {
        return item;
      }
      if (item.role === name) {
        return item;
      }
    });
    return items;
  };

  const handleClickAction = (payload) => {
    setClickTyped(null);
    const { eventId, params, title } = payload;
    if (params === "VIEW_ORDERS") {
      setClickTyped(params);
      dispatch({
        type: "SELECT_AUID_FOR_BOOKINGS",
        payload: eventId,
      });
      onOpen();
    }
    if (params === "CANCEL_EVENT") {
      dispatch(updateEventStatus({ eventId, status: "cancelled" }, toast));
      setClicked(true);
    }
    if (params === "MARK_COMPLETED") {
      dispatch(updateEventStatus({ eventId, status: "completed" }, toast));
      setClicked(true);
    }
    if (params === "MARK_ATTENDANCE") {
      dispatch({
        type: "SET_EVENT_ID_FOR_ATTENDANCE",
        payload: { eventId, title },
      });
      setClickTyped(params);
      onOpen();
    }
  };
  return (
    <Box className="min-h-screen flex flex-no-wrap">
      <Helmet>
        <title>Events Dashboard - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <SideBar>
        <Box className="p-5 mobile:p-3">
          <Box mb={5} className="flex justify-between items-center w-full">
            <Text fontSize="2xl" fontWeight="extrabold">
              Events
            </Text>
            <Button onClick={() => navigate("/admin/add-event")}>
              Add Event
            </Button>
          </Box>
          {isOpen && clickTyped === "VIEW_ORDERS" && (
            <ViewParticipants
              title="User Bookings"
              onClose={onClose}
              isOpen={isOpen}
            />
          )}
          {isOpen && clickTyped === "MARK_ATTENDANCE" && (
            <MarkAttendance
              title="Mark Attendance"
              onClose={onClose}
              isOpen={isOpen}
            />
          )}
          {loading && (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner size="xl" />
            </div>
          )}
          {error && (
            <ErrorMessage
              message={message}
              submessage={"Oops, Something went Wrong."}
            />
          )}
          {!loading &&
            success &&
            data?.map((event) => {
              return (
                <div
                  key={event._id}
                  className="mb-5 flex shadow-md cursor-pointer w-full duration-300 mobile:flex-col mobile:relative"
                >
                  <div className="inline group h-48 w-70 md:min-w-fit">
                    <Image
                      className="rounded-t object-cover h-48 w-72 mobile:w-full"
                      src={event.thumbnail}
                      alt="Product Preview"
                    />
                  </div>
                  <div className="flex flex-col rounded-b p-3 w-4/5 mobile:w-full">
                    <div className="text-xl font-bold font-[Acharya-bold] truncate">
                      {event.title}
                    </div>
                    <div className="text-xxs text-gray-400 truncate mt-1 capitalize">
                      {event.status === "active"
                        ? event.slots + " " + "Slots Left"
                        : event.status}
                    </div>
                    <div className="text-md font-[Acharya-bold] text-gray-600 dark:text-white font-bold mt-4">
                      ₹{event.entryFee}
                    </div>
                    <div className="flex flex-row mt-2">
                      <div className="flex flex-col flex-auto">
                        <div
                          className="text-xxs text-gray-400 mt-1"
                          title="34k Downlaods in this year"
                        >
                          {event.confirmedParticipients} Participants
                        </div>
                        <div className="text-xxs text-gray-400 mt-1">
                          {moment(event?.eventDate).format("LL")} at{" "}
                          {moment(event.timing, "h:mm a").format("h:mm a")}
                        </div>
                      </div>
                      <div className="flex flex-col flex-auto justify-end">
                        <ButtonQuickAction
                          title="Manage Event"
                          isClicked={clicked}
                          setClicked={setClicked}
                        >
                          {getItemsForMenu(event.status).map((item) => {
                            return (
                              <Button
                                key={item.name}
                                onClick={() =>
                                  handleClickAction({
                                    ...item,
                                    eventId: event._id,
                                    title: event.title,
                                  })
                                }
                                className="w-full mb-2"
                              >
                                {item.name}
                              </Button>
                            );
                          })}
                        </ButtonQuickAction>
                      </div>
                    </div>
                  </div>
                  <BookingStatus status={event.status} />
                </div>
              );
            })}
        </Box>
      </SideBar>
    </Box>
  );
};

export { AdminEvents };
