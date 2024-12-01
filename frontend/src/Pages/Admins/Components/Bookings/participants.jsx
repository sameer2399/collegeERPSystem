import { Box, Button, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonQuickAction,
  ErrorMessage,
  FullScreenModal,
  NormalModal,
} from "../../../../Components";
import { fetchEventParticipants } from "../../../../Redux/Actions";
import { StatsCard } from "../Cards";
export const ViewParticipants = (props) => {
  const { loading, success, data, error, message, selectedAuid } = useSelector(
    (state) => state.admin
  );
  var moneySettled = 0,
    moneyOnPOD = 0,
    onlinePayment = 0;
  if (success && data.length > 0) {
    moneySettled = data
      ?.filter((item) => item.status === "completed")
      .reduce((curr, accu) => curr + accu.paymentDetails.TXNAMOUNT, 0);
    moneyOnPOD = data
      ?.filter(
        (item) => item.paymentMode === "Cash" && item.status === "completed"
      )
      .reduce((curr, accu) => curr + accu.paymentDetails.TXNAMOUNT, 0);
    onlinePayment = data
      ?.filter(
        (item) => item.paymentMode === "Online" && item.status === "completed"
      )
      .reduce((curr, accu) => curr + accu.paymentDetails.TXNAMOUNT, 0);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.isOpen) {
      dispatch(fetchEventParticipants(selectedAuid));
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
        return "bg-red-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      case "completed":
        return "bg-green-400 text-white";
      default:
        return "bg-gray-500";
    }
  };
  const handleClickAction = (payload) => {
    setSelectedPayment(null);
    setSelectedPayment(payload);
    onOpen();
  };
  const PaymentDetailsModal = () => {
    return (
      <NormalModal
        title="Payment Details"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        {JSON.stringify(selectedPayment)}
      </NormalModal>
    );
  };
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
      success && (
        <Box className="p-5">
          <Text fontSize="2xl" fontWeight="extrabold">
            <PaymentDetailsModal />
            <Box className="grid grid-cols-4 auto-cols-max gap-5 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
              <StatsCard title="Confirmed Bookings" stat={data.length} />
              <StatsCard title="Money Settled" stat={moneySettled} />
              <StatsCard title="POD Amount" stat={moneyOnPOD} />
              <StatsCard title="Online Amount" stat={onlinePayment} />
            </Box>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th className="text-left font-[Acharya-semi] text-sm p-4 ">
                      Order ID
                    </th>
                    <th className="text-left font-[Acharya-semi] text-sm p-4">
                      Name
                    </th>
                    <th className="text-left font-[Acharya-semi] text-sm p-4">
                      AUID
                    </th>
                    <th className="text-left font-[Acharya-semi] text-sm p-4">
                      Phone
                    </th>
                    <th className="text-left font-[Acharya-semi] text-sm p-4 ">
                      Booking Status
                    </th>
                    <th className="text-left font-[Acharya-semi] text-sm p-4 ">
                      Payment Mode
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
                        <td className="">
                          <div className="flex items-center pl-5">
                            <Text className="text-base leading-none mr-2">
                              {event.orderId}
                            </Text>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-bold leading-none mr-2">
                              {event.name}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-bold leading-none mr-2">
                              {event.auid}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-bold leading-none mr-2">
                              {event.phone}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5  lg:table-cell">
                          <button
                            className={`capitalize py-3 px-3 text-sm focus:outline-none leading-none rounded ${returnColorForStatus(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </button>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-bold leading-none mr-2 capitalize">
                              {event.paymentMode}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-normal w-fit">
                          <ButtonQuickAction title="Manage">
                            <Button
                              onClick={() => handleClickAction({ ...event })}
                              className="text-sm w-full mb-2"
                            >
                              View Payment Details
                            </Button>
                          </ButtonQuickAction>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Text className="text-center text-sm text-gray-600 font-bold w-full mt-5">
                No more participants found.
              </Text>
            </div>
          </Text>
        </Box>
      )
    );
  };
  return (
    <FullScreenModal
      onClose={props.onClose}
      size="full"
      isOpen={props.isOpen}
      title={`Event Participants`}
    >
      <DataForFirstPage />
    </FullScreenModal>
  );
};
