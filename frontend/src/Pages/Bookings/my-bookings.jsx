import "./style.css";
import { useNavigate } from "react-router-dom";
import { Spinner, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyOrders } from "../../Redux/Actions";
import { ErrorMessage } from "../../Components";
import { Helmet } from "react-helmet";
const MyBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, bookings, message, success } = useSelector(
    (state) => state.myBookings
  );
  const handleNavigateToBill = (params) => {
    navigate(`/orderStatus/${params}`);
  };

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

  useEffect(() => {
    if (!success) {
      dispatch(fetchMyOrders());
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || bookings.length === 0) {
    return (
      <ErrorMessage
        message={message}
        submessage="Oops, Something Hitted Hard. Start Booking Events Now."
      />
    );
  }

  return (
    <div>
      <div className="p-10 mobile:p-4 w-full min-h-screen">
        <Helmet>
          <title>My Bookings - Acharya ERP</title>
          <meta name="description" content="This is the home page." />
        </Helmet>
        {/* <Text className="font-[Acharya-bold] text-2xl font-bold mb-5">
          My Bookings
        </Text> */}
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th className="text-left font-[Acharya-semi]  p-4 mobile:hidden">
                  Booking ID
                </th>
                <th className="text-left font-[Acharya-semi]  p-4">
                  Event Name
                </th>
                <th className="text-left font-[Acharya-semi]  p-4 mobile:hidden">
                  Event Status
                </th>
                <th className="text-left font-[Acharya-semi]  p-4">View</th>
                <th className="text-left font-[Acharya-semi]  p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((event) => {
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
                    <td className="pl-4">
                      <button
                        onClick={() => handleNavigateToBill(event.orderId)}
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <div className="relative px-5 pt-2">
                        <button
                          className="focus:ring-2 rounded-md focus:outline-none"
                          role="button"
                          aria-label="option"
                        >
                          <svg
                            className="dropbtn"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                          <div
                            tabIndex={0}
                            className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Edit</p>
                          </div>
                          <div
                            tabIndex={0}
                            className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                          >
                            <p>Delete</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Text className="text-center text-gray-600 font-bold w-full mt-5">
            No more bookings found.
          </Text>
        </div>
      </div>
    </div>
  );
};

export { MyBookings };
