import { Box, Spinner, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserEachOrder } from "../../Redux/Actions";
import moment from "moment";
import { Error } from "..";
import QRCode from "react-qr-code";
import Lottie from "react-lottie-player";
import successIcon from "../../Components/Icons/success.json";
import failureIcon from "../../Components/Icons/failure.json";
import { Helmet } from "react-helmet";
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { loading, success, error, checkout, message } = useSelector(
    (state) => state.checkout
  );
  useEffect(() => {
    dispatch(fetchUserEachOrder(orderId));
    return () => {
      dispatch({ type: "CLEAR_CHECKOUT" });
    };
  }, []);
  const { event, paymentDetails } = checkout;
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  const generateBill = () => {
    const entryFee = event.entryFee;
    if (entryFee === 0) {
      return { entryFee: 0, total: 0, tax: 0 };
    }
    const tax = 0;
    const total = entryFee + tax;
    return { entryFee, tax, total };
  };

  const fullPaymentModeName = (paymentMode) => {
    switch (paymentMode) {
      case "CARD":
        return "Card";
      case "NB":
        return "Net Banking";
      case "PAYPAL":
        return "Paypal";
      case "WALLET":
        return "Wallet";
      case "UPI":
        return "UPI";
      case "Cash":
        return "Pay Before Event";
      case "Voucher":
        return "Voucher";
      default:
        return "Online Payment";
    }
  };

  const RenderOrderNote = () => {
    if (checkout.paymentMode === "Cash" || checkout.paymentMode === "Voucher") {
      return <Text>Note: {paymentDetails?.RESPMSG} </Text>;
    }
  };

  if (!loading && error && message) {
    return <Error />;
  }

  const getStatusText = () => {
    if (checkout?.status === "confirmed") {
      return "Your Booking has been Confirmed";
    } else if (checkout?.status === "failed") {
      return "Your Booking has been Failed";
    } else if (checkout?.status === "pending") {
      return "Your Booking is Pending";
    } else if (checkout?.status === "cancelled") {
      return "Your Booking has been Cancelled";
    } else if (checkout?.status === "completed") {
      return "Your Booking has been Completed";
    } else if (checkout?.status === "not attended") {
      return "Your Booking has not been attended";
    }

    return "Your Booking is Pending";
  };
  return (
    success && (
      <div className="movie-facility mt-20 mb-20">
        <Helmet>
          <title>Order Confirmation - Acharya ERP</title>
          <meta name="description" content="This is the home page." />
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box className="checkout-widget flex flex-row flex-wrap items-center justify-between bg-[#DEE2FF]">
                <div className="w-3/4 items-center">
                  <h5 className="text-white text-xl font-bold capitalize">
                    {getStatusText()}
                  </h5>
                </div>
                <Lottie
                  loop
                  animationData={
                    checkout?.status === "confirmed" ||
                    checkout?.status === "completed"
                      ? successIcon
                      : failureIcon
                  }
                  play
                  style={{ width: 100, height: 70 }}
                />
              </Box>
              <Box className="checkout-widget checkout-contact min-h-fit">
                <h5 className="title text-white text-xl font-bold">
                  Personal Details
                </h5>
                <Box className="flex gap-2 flex-col pb-0">
                  <Text>Name: {checkout?.name}</Text>
                  <Text>AUID: {checkout?.auid}</Text>
                  <Text>Email: {checkout?.email}</Text>
                  <Text>Phone: {checkout?.phone}</Text>
                  <Text color={"#fff"} className="font-white">
                    Note: This is strictly inform you that, you should carry
                    your valid College ID card beforehand. If you found breaking
                    rule you will be banned from the event and further action
                    will be taken.
                  </Text>
                </Box>
              </Box>
              <Box className="checkout-widget checkout-contact min-h-fit">
                <h5 className="title text-white text-xl font-bold">
                  Transaction Details
                </h5>
                <Box className="flex gap-2 flex-col">
                  <Box className="flex justify-between mobile:flex-col mobile:gap-2">
                    <Text>TXN ID: {paymentDetails?.TXNID}</Text>
                    <Text>
                      Date: {moment(paymentDetails?.TXNDATE).format("lll")}
                    </Text>
                  </Box>
                  <Text>
                    Payment Mode: {""}
                    {fullPaymentModeName(paymentDetails?.PAYMENTMODE)}
                  </Text>
                  <RenderOrderNote />
                </Box>
              </Box>
            </div>
            <div className="col-lg-4 summary-mobile">
              <div className="booking-summery bg-one text-white">
                <h4 className="title">booking summary</h4>
                {checkout.status === "confirmed" && (
                  <QRCode
                    size={256}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "50%",
                      margin: "auto",
                    }}
                    viewBox={`0 0 256 256`}
                    value={checkout.orderId}
                    bgColor="#FFFFFF"
                    level="Q"
                    fgColor="#000000"
                  />
                )}
                <ul>
                  <li>
                    <h6 className="subtitle">Event:</h6>
                    <span className="info">{event?.title}</span>
                  </li>
                  <li>
                    <h6 className="subtitle">
                      <span>Venue:</span>
                      <span>{event?.venue}</span>
                    </h6>
                    <div className="info">
                      <span>
                        {moment(event?.eventDate).format("LL")} at{" "}
                        {moment(event.timing, "h:mm a").format("h:mm a")}
                      </span>
                    </div>
                  </li>
                  <li>
                    <h6 className="subtitle mb-0">
                      <span>Tickets Price</span>
                      <span>{event?.entryFee} ₹</span>
                    </h6>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span className="info">
                      <span>price</span>
                      <span>{generateBill().entryFee} ₹</span>
                    </span>
                    <span className="info">
                      <span>gst (18%)</span>
                      <span>Not Applicable</span>
                    </span>
                    <span className="info">
                      <span>Discount</span>
                      <span>0 ₹</span>
                    </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span className="info">
                      <span>Total Amount</span>
                      <p className="font-bold font-white">
                        {paymentDetails?.TXNAMOUNT} ₹
                      </p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export { OrderConfirmation };
