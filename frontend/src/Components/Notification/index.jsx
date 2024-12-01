import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const Notification = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <Alert
      status={props.status === true ? "success" : "error"}
      className="flex justify-center items-center"
    >
      <AlertIcon />
      <Box>
        <AlertTitle>
          {props.status === "success" ? "Success!" : "Something Went Wrong"}
        </AlertTitle>
        <AlertDescription>{props.message}</AlertDescription>
      </Box>
      <Box className="items-center">
        <CloseButton
          //   alignSelf="flex-start"
          className="mr-2"
          onClick={() => setIsOpen(false)}
        />
      </Box>
    </Alert>
  ) : null;
};

export { Notification };
