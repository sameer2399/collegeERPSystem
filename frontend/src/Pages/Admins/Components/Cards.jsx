import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

export function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      cursor={"pointer"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontSize={{ base: "md", md: "xl", xl: "2xl" }}
            className="font-[Acharya-bold] whitespace-nowrap overflow-hidden text-ellipsis "
            istruncated={"true"}
          >
            {title}
          </StatLabel>
          <StatNumber
            width={"80%"}
            fontSize={{ base: "md", md: "xl", xl: "2xl" }}
            className="font-[Acharya-bold]"
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
