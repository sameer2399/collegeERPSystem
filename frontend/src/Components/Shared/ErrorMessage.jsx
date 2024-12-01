import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ErrorMessage = (props) => {
  return (
    <Box
      textAlign="center"
      height={500}
      className="flex flex-col justify-center text-center items-center"
      py={10}
      px={6}
    >
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading
        className={props.className}
        as="h2"
        size={`${props.className ? "" : "xl"}`}
        mt={6}
        mb={2}
      >
        {props.message}
      </Heading>
      <Text color={"gray.500"}>{props.submessage}</Text>
    </Box>
  );
};

export { ErrorMessage };
