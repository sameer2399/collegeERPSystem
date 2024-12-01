import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonQuickAction,
  ErrorMessage,
  FullScreenModal,
} from "../../../../Components";
import { fetchEachUserBooking } from "../../../../Redux/Actions";
export const ViewBookings = (props) => {
  const { loading, success, data, error, message, selectedAuid } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const Steps = {
    1: FullScreenModal,
  };
  useEffect(() => {
    if (props.isOpen) {
      dispatch(fetchEachUserBooking(selectedAuid));
    }
    return () => {
      if (!props.isOpen) {
        dispatch({ type: "ADMIN_CLEAR_AUID" });
      }
    };
  }, [selectedAuid, props.isOpen]);
  const returnColorForStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black";
      case "confirmed":
        return "bg-green-400 text-white";
      case "cancelled":
        return "bg-red-500 text-red-700";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500";
    }
  };

  const [step, setStep] = useState(1);
  const Step = Steps[step];
  const DataForFirstPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      );
    }
    if (error) {
      return (
        <ErrorMessage
          message={message}
          submessage={"Oops, Something went Wrong."}
        />
      );
    }
    return (
      <Box className="p-5">
        <Text fontSize="2xl" fontWeight="extrabold">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th className="text-left font-[Acharya-semi] text-sm p-4 mobile:hidden">
                    Booking ID
                  </th>
                  <th className="text-left font-[Acharya-semi] text-sm p-4">
                    Event Name
                  </th>
                  <th className="text-left font-[Acharya-semi] text-sm p-4 mobile:hidden">
                    Booking Status
                  </th>
                  <th className="text-left font-[Acharya-semi] text-sm p-4">
                    Booking Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((event) => {
                  return (
                    <tr
                      key={event.orderId}
                      tabIndex={0}
                      className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                      <td className="mobile:hidden">
                        <div className="flex items-center pl-5">
                          <Text className="text-base leading-none mr-2">
                            {event.orderId}
                          </Text>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center pl-5">
                          <p className="text-base font-bold leading-none mr-2">
                            {event.event.title}
                          </p>
                        </div>
                      </td>

                      <td className="pl-5 mobile:hidden lg:table-cell">
                        <button
                          className={`capitalize py-3 px-3 text-sm focus:outline-none leading-none rounded ${returnColorForStatus(
                            event.status
                          )}`}
                        >
                          {event.status}
                        </button>
                      </td>
                      <td className="pl-4 text-sm">
                        {moment(event.createdAt).format("LL")}
                      </td>
                      <td className="whitespace-normal w-fit">
                        <ButtonQuickAction>
                          <Button className="text-sm w-full mb-2">
                            View Event Detail
                          </Button>
                          <Button className="text-sm w-full mb-2">
                            Cancel Booking
                          </Button>
                          <Button className="text-sm w-full mb-2">
                            View Booking Details
                          </Button>
                        </ButtonQuickAction>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Text className="text-center text-sm text-gray-600 font-bold w-full mt-5">
              No more bookings found.
            </Text>
          </div>
        </Text>
      </Box>
    );
  };
  return (
    <Step
      onClose={props.onClose}
      size="full"
      isOpen={props.isOpen}
      title={`Bookings of ${selectedAuid}`}
      onNext={() => setStep((prev) => prev + 1)}
      onBack={() => setStep((prev) => prev - 1)}
    >
      <DataForFirstPage />
    </Step>
  );
};
