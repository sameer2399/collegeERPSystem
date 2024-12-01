import {
  Box,
  Container,
  // Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text className="logo" fontWeight="extrabold" fontSize={"4xl"}>
                Acharya ERP
              </Text>
            </Box>
            <Text fontSize={"sm"}>© 2022. This is not official ERP. This is for education purpose only.</Text>
          </Stack>
          <Stack align={"flex-start"} fontWeight="bold">
            <ListHeader className="font-bold">Quick Links</ListHeader>
            <Link to={"/attendance"}>Attendance</Link>
            <Link to={"/events"}>Events</Link>
            <Link to={"/class"}>Classes</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/setting"}>Settings</Link>
          </Stack>
          <Stack align={"flex-start"} fontWeight="bold">
            <ListHeader>Company</ListHeader>
            <Link to={"/attendance"}>About</Link>
            <Link to={"/attendance"}>Press</Link>
            <Link to={"/attendance"}>Careers</Link>
            <Link to={"/attendance"}>Contact</Link>
            <Link to={"/attendance"}>Partners</Link>
          </Stack>
          <Stack align={"flex-start"} fontWeight="bold">
            <ListHeader>Support</ListHeader>
            <Link to={"/developers"}>Developers</Link>
            <Link to={"/attendance"}>Terms of Service</Link>
            <Link to={"/attendance"}>Legal</Link>
            <Link to={"/attendance"}>Privacy Policy</Link>
            <Link to={"/attendance"}>Status</Link>
          </Stack>
          <Stack align={"flex-start"} fontWeight="bold">
            <ListHeader>Follow Us</ListHeader>
            <Link to={"/attendance"}>Facebook</Link>
            <Link to={"/attendance"}>Twitter</Link>
            <Link to={"/attendance"}>Instagram</Link>
            <Link to={"/attendance"}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
