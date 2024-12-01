import { Button } from "@chakra-ui/react";
const Buttons = (props) => {
  return (
    <Button
      type={props.type}
      fontFamily={"inherit"}
      onClick={props.onClick}
      w={"full"}
      bgGradient="linear(to-r, blue.400,pink.400)"
      className={props.className}
      color={"white"}
      isLoading={props?.loading}
      loadingText="Processing...."
      colorScheme="teal"
      // variant="outline"
      spinnerPlacement="start"
      _hover={{
        bgGradient: "linear(to-r, blue.500,pink.500)",
        boxShadow: "xl",
      }}
      outline="none"
    >
      {props?.children}
    </Button>
  );
};

export { Buttons };
