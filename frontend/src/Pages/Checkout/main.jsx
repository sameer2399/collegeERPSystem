import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ErrorMessage } from "../../Components";
const CheckoutMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error, checkout, message } = useSelector(
    (state) => state.checkout
  );
  useEffect(() => {
    if (success) {
      navigate(`/checkout/${checkout.orderId}`);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_CHECKOUT" });
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    error && (
      <ErrorMessage
        message="Oops, Something went Wrong."
        submessage={message}
      />
    )
  );
};

export { CheckoutMain };
