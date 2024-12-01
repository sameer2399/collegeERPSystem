import "./style.css";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  useColorMode,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { Buttons, Modal, ErrorMessage } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCheckout, initPayment, makeFreeOrder } from "../../Redux/Actions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { post } from "../../Utils/paytm";
import { useFormik } from "formik";

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      mobile: user?.mobile,
    },
    validate: (values) => {
      let errors = {};
      if (!values.mobile) {
        errors.mobile = "Mobile is required";
      }
      if (!/^[0-9]{10}$/.test(values.mobile)) {
        errors.mobile = "Mobile must be 10 digits";
      }
      return errors;
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkOutId } = useParams();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { loading, success, error, checkout, message } = useSelector(
    (state) => state.checkout
  );
  const { event } = checkout;
  const [totalTimer, setTotalTimer] = useState("");
  const [modal, setModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [payment, setPayment] = useState("1");
  const generateBill = () => {
    const entryFee = event.entryFee;
    if (entryFee === 0) {
      return { entryFee: 0, total: 0, tax: 0 };
    }
    const tax = 0;
    const total = entryFee + tax;
    return { entryFee, tax, total };
  };
  useEffect(() => {
    dispatch(fetchCheckout(checkOutId));
    return () => {
      dispatch({ type: "CLEAR_CHECKOUT" });
    };
  }, []);

  useEffect(() => {
    if (event?.entryFee === 0) {
      setPayment("3");
    }
    if (checkout.expiry) {
      const expiry = moment(checkout.expiry);
      const interval = setInterval(() => {
        if (expiry.diff(moment(), "seconds") <= 0) {
          clearInterval(interval);
          return setModal(true);
        }
        const diff = expiry.diff(moment());
        const duration = moment.duration(diff);
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTotalTimer(`${minutes}:${seconds}`);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [checkout?.expiry]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!loading && error && message) {
    return (
      <ErrorMessage
        message={message}
        submessage={"Please Go Back and Try Again."}
      />
    );
  }

  const datatoSend = {
    auid: user.auid,
    eventId: event.id,
    name: user.student_name,
    email: user.acerp_email,
    phone: formik.values.mobile,
    amount: generateBill().total,
    orderId: checkout?.orderId,
    checkOutId: checkout?._id,
  };

  const handleProceedToPayment = async () => {
    setisLoading(true);
    if (formik.errors.mobile) {
      return;
    }

    if (payment === "2" || payment === "3") {
      const response = await makeFreeOrder(datatoSend, toast);
      if (response !== false) {
        navigate(`/orderStatus/${response?.orderId}`);
      }
      setisLoading(false);
      return;
    }
    if (payment === "1") {
      const response = await initPayment(datatoSend, toast);
      if (response !== false) {
        var details = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response,
        };
        post(details);
      }
      setisLoading(false);
    }
  };

  const ShowModalToExpiredCheckOut = () => (
    <Modal isOpen={modal}>
      <h1 className="text-xl mb-4 font-bold text-slate-500 font-[Acharya-bold]">
        Your Checkout Session has been expired.
      </h1>
      <p className="text-slate-500 mb-4 ">Go back, and try Again.</p>
      <button
        onClick={() => setModal(false) || navigate(`/events/${event.id}`)}
        className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white "
      >
        Take me Back
      </button>
    </Modal>
  );

  return (
    success &&
    checkout?._id && (
      <div className="movie-facility mt-20">
        <ShowModalToExpiredCheckOut />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Box className="checkout-widget flex flex-wrap items-center justify-between bg-[#DEE2FF]">
                <div className="title-area">
                  <h5 className="text-white text-xl font-bold">
                    Hi, {user.student_name}. Your booking is just a few steps
                    away
                  </h5>
                  <p className="mt-3">
                    {totalTimer
                      ? `You have ${totalTimer} left to Checkout.`
                      : null}
                  </p>
                </div>
              </Box>
              <Box className="checkout-widget checkout-contact min-h-fit checkout-personal">
                <h5 className="title text-white text-xl font-bold">
                  Your Contact Details
                </h5>
                <form className="checkout-contact-form">
                  <FormControl isInvalid={false}>
                    <FormLabel className="text-white" htmlFor="title">
                      Your Full Name
                    </FormLabel>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      className="text-white"
                      value={user.student_name}
                      disabled
                    />
                  </FormControl>
                  <Box className="flex justify-between w-full gap-4 mobile:flex-col mt-4 mb-5 mobile:gap-0">
                    <FormControl isInvalid={false}>
                      <FormLabel className="text-white" htmlFor="title">
                        Your Email Id
                      </FormLabel>
                      <Input
                        id="mobile"
                        type="title"
                        name="mobile"
                        placeholder="Event Title"
                        className="text-white"
                        value={user?.acerp_email}
                        disabled
                      />
                    </FormControl>
                    <FormControl isInvalid={formik.errors.mobile}>
                      <FormLabel
                        className="text-white mobile:mt-4"
                        htmlFor="title"
                      >
                        Your Contact No.
                      </FormLabel>
                      <Input
                        id="mobile"
                        type="number"
                        name="mobile"
                        placeholder="Your Phone Number"
                        className="text-white"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.mobile && (
                        <FormErrorMessage>
                          {formik.errors.mobile}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <p className="mt-3">
                    Note: We are directly filling all the data to prevent bulk
                    booking. You can't change data.
                  </p>
                </form>
              </Box>
              <Box className="checkout-widget checkout-contact checkout-personal">
                <h5 className="title text-white text-xl font-bold">
                  Promo Code
                </h5>
                <form className="checkout-contact-form ">
                  <Flex gap={5} className="items-center w-full">
                    <Input
                      className="text-white"
                      placeholder="Enter Promo Code"
                      width="70%"
                    />
                    <Buttons className="w-11">Apply</Buttons>
                  </Flex>
                </form>
              </Box>
            </div>
            <div className="col-lg-4 summary-mobile">
              <div className="booking-summery bg-one text-white">
                <h4 className="title">booking summary</h4>
                <ul>
                  <li>
                    <h6 className="subtitle">Event</h6>
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
                <ul
                  className={`side-shape mobile:hidden ${
                    colorMode === "dark"
                      ? "after:bg-[#1a202c] before:bg-[#1a202c]"
                      : "after:bg-white before:bg-white"
                  }`}
                >
                  <li>
                    <h6 className="subtitle">
                      <span>combos</span>
                      <span>57 ₹</span>
                    </h6>
                    <span className="info">
                      <span>2 Nachos Combo</span>
                    </span>
                  </li>
                  <li>
                    <h6 className="subtitle">
                      <span>food &amp; bevarage</span>
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
                      <span>Not Appplicable </span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="proceed-area text-center text-white">
                <h6 className="flex font-bold uppercase mb-4 justify-between">
                  <span>Total Amount</span>
                  <span className="font-bold">{generateBill().total} ₹</span>
                </h6>
                {event?.entryFee > 0 && (
                  <Box className="flex justify-start">
                    <RadioGroup
                      onChange={setPayment}
                      value={payment}
                      name="form-name"
                      className="flex flex-col gap-2 mb-4"
                    >
                      <Radio value="1">Pay Online</Radio>
                      <Radio value="2">Pay Before Event</Radio>
                    </RadioGroup>
                  </Box>
                )}
                <Buttons loading={isLoading} onClick={handleProceedToPayment}>
                  {payment === "1"
                    ? "Proceed to Payment"
                    : payment === "3"
                    ? "Confirm Booking"
                    : "Pay Before Event"}
                </Buttons>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export { Checkout };
