import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EventCard, SubscribeEvent } from "../../Components";
import { fetchEvents } from "../../Redux/Actions";

const Event = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToAddToRoutes = () => navigate("/admin/add-event");
  const { loading, success, events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchEvents());
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Events - Acharya ERP</title>
      </Helmet>
      <SubscribeEvent />
      <Box minHeight={"50vh"} className="p-10 mobile:p-4">
        <Box className="flex justify-between mobile:my-5">
          <Text className="text-4xl font-[Acharya-bold] mb-4">All Events</Text>
          {user?.role === "ADMIN" || user?.role === "MODERATOR" ? (
            <Button onClick={navigateToAddToRoutes}>Add Event</Button>
          ) : null}
        </Box>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            {!loading && events.length === 0 ? (
              <div className="flex flex-wrap justify-center items-center text-center h-full bg-red.100 ">
                <Text className="text-center text-3xl font-[Acharya-bold]">
                  No Events Found
                </Text>
              </div>
            ) : null}
            <Box className="grid grid-cols-4 auto-cols-max gap-5 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {success &&
                events.length > 0 &&
                events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export { Event };
