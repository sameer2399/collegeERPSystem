import {
  Box,
  Image,
  Spinner,
  Text,
  useToast,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchEvent, initializeCheckout } from "../../Redux/Actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "..";
import {
  EventCard,
  BeatLoaderIcon,
  StylishCalenderIcon,
  StylishClockIcon,
  StylishLocationIcon,
  StylishTermsIcon,
  PlainCategoryIcon,
} from "../../Components";
import { Helmet } from "react-helmet";
import { ArrowBackIcon } from "@chakra-ui/icons";
import moment from "moment";

const EventPage = () => {
  const dispatch = useDispatch();
  const locationquery = useLocation();
  let from = locationquery.state?.from?.pathname || "/events";
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading, event, success } = useSelector((state) => state.event);
  const [isLoading, setisLoading] = useState(false);
  const {
    title,
    category,
    slots,
    description,
    eventDate,
    timing,
    thumbnail,
    entryFee,
    organisedBy,
    _id,
    suggestedEvents,
    rules,
    isBooked,
    venue,
  } = event;

  const { eventId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchEvent(eventId));
  }, [eventId]);

  const handleInitializeCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Something went wrong",
        description: "You need to login to continue",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
      return;
    }
    if (isBooked)
      return toast({
        title: "Something went wrong",
        description: "You have already booked this event",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
    if (slots === 0) {
      return toast({
        title: "Oops, You just missed.",
        description: "No more slots available",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
    }
    setisLoading(true);
    dispatch({
      type: "SETUP_CHECKOUT_EVENTID",
      payload: _id,
    });
    dispatch(initializeCheckout(_id));
    return navigate("/checkout");
  };

  const handleGoBack = () => {
    navigate(from);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if ((!loading, !event, !success)) {
    return <Error />;
  }

  return (
    <Box className="select-none">
      <Helmet>
        <title>{title} - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <Box className="px-16 gap-20 mt-2 mobile:px-4 flex mobile:flex-col lg:px-10 lg:gap-10 mobile:gap-5">
        {/* Left Side  */}
        <Box className="w-3/5 mobile:w-full">
          <Box className="flex text-center items-center gap-2 text-gray-500 mb-5">
            <ArrowBackIcon
              onClick={handleGoBack}
              size={[20, 22, 30, 34]}
              cursor="pointer"
            />
            <Text className="select-none cursor-pointer" onClick={handleGoBack}>
              Go Back to Events
            </Text>
          </Box>
          <Text className="text-2xl font-bold mb-3 font-[Acharya-bold]">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 mb-4 font-[Acharya-semi]">
            {description}
          </Text>
          <Image
            src={thumbnail}
            alt=""
            className="min-w-full min-h-90 object-cover"
            maxHeight={["300px", "400px", "350px", "400px"]}
          />
          <Box>
            <Text className="text-xl font-bold my-4 font-[Acharya-bold]">
              Rules
            </Text>
            <Text>{rules}</Text>
          </Box>
        </Box>
        {/* Right Side */}
        <Box className="w-2/5 p-2 mobile:w-full">
          <Box className="flex gap-3 items-center mb-5">
            <Text className="text-[#1BDC2E] text-2xl font-bold font-[Acharya-bold]">
              {entryFee > 0 ? `₹ ${entryFee}` : "Free"}
            </Text>
            <Text className="text-md">{slots} Slots Left</Text>
          </Box>
          <Button
            border="2px"
            borderColor="black"
            _dark={{
              borderColor: "white",
              colorScheme: "red",
            }}
            _disabled={{
              opacity: 1,
            }}
            isLoading={isLoading}
            colorScheme="yellow"
            className="w-full"
            fontSize={["sm", "md", "lg"]}
            spinner={
              <Icon
                as={BeatLoaderIcon}
                w={{ base: 12, md: 12, xl: 14 }}
                h={{ base: 12, md: 12, xl: 14 }}
                color="white"
              />
            }
            onClick={handleInitializeCheckout}
            p={6}
          >
            Book Now
          </Button>
          <Box className="flex justify-between my-12">
            <Box className="w-[20%] xl:w-[25%] text-center">
              <Icon
                as={StylishCalenderIcon}
                w={{ base: 12, md: 12, xl: 14 }}
                h={{ base: 12, md: 12, xl: 14 }}
              />
              <Box className="my-2">
                <Text className="text-2xl xl:text-xl font-extrabold font-[Acharya-bold]">
                  {moment(eventDate).format("DD")}
                </Text>
                <Text className="text-md font-extrabold font-[Acharya-bold]">
                  {moment(eventDate).format("MMM YY")}
                </Text>
              </Box>
            </Box>
            <Box className="w-[20%] xl:w-[25%] text-center">
              <Icon
                as={StylishClockIcon}
                w={{ base: 12, md: 12, xl: 14 }}
                h={{ base: 12, md: 12, xl: 14 }}
              />
              <Box className="my-2">
                <Text className="text-2xl xl:text-xl font-extrabold font-[Acharya-bold]">
                  {moment(timing, "HH:mm").format("h:mm")}
                </Text>
                <Text className="text-md font-extrabold font-[Acharya-bold] uppercase">
                  {moment(timing, "HH:mm").format("A")}
                </Text>
              </Box>
            </Box>
            <Box className="w-[20%] xl:w-[25%] text-center">
              <Icon
                as={StylishTermsIcon}
                w={{ base: 12, md: 12, xl: 14 }}
                h={{ base: 12, md: 12, xl: 14 }}
              />
              <Box className="my-2">
                <Text className="text-md font-extrabold font-[Acharya-bold]">
                  NON
                </Text>
                <Text className="text-sm font-extrabold font-[Acharya-bold]">
                  Refundable
                </Text>
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-start items-center mb-8">
            <Icon
              as={StylishLocationIcon}
              w={{ base: 12, md: 12, xl: 14 }}
              h={{ base: 12, md: 12, xl: 14 }}
            />
            <Box className="my-4 mx-2 ">
              <Text className="text-md text-gray-400">Venue:</Text>
              <Text className="text-md font-extrabold font-[Acharya-bold]">
                {venue}
              </Text>
            </Box>
          </Box>
          <Box className="flex justify-start items-center mb-8">
            <Icon
              as={PlainCategoryIcon}
              w={{ base: 12, md: 12, xl: 14 }}
              h={{ base: 12, md: 12, xl: 14 }}
            />
            <Box className="my-4 mx-2 ">
              <Text className="text-md text-gray-400">Category:</Text>
              <Text className="text-md font-extrabold font-[Acharya-bold]">
                {category}
              </Text>
            </Box>
          </Box>
          <Box className="justify-start items-center">
            <Text className="text-md text-gray-400">Organised By:</Text>
            <Text className="text-md font-extrabold font-[Acharya-bold]">
              {organisedBy}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="px-10 mobile:px-4">
        <Text className="my-10 font-extrabold text-3xl font-[Acharya-bold]">
          Suggested Events
        </Text>
        {!suggestedEvents.length && (
          <Box className="w-full" height="100px">
            <Text className="text-gray-400 text-center">
              No Suggested Events
            </Text>
          </Box>
        )}
        <Box className="grid grid-cols-4 auto-cols-max gap-5 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {suggestedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export { EventPage };
