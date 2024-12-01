import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const CategoryCard = () => {
  const navigate = useNavigate();
  const array = [
    {
      id: uuidv4(),
      title: "Attendance",
      icon: "fa-solid fa-graduation-cap",
      url: "/attendance",
    },
    {
      id: uuidv4(),
      title: "Classes",
      icon: "fa-solid fa-book",
      url: "/class",
    },
    {
      id: uuidv4(),
      title: "Events",
      icon: "fa-solid fa-calendar-days",
      url: "/events",
    },
    {
      id: uuidv4(),
      title: "My Profile",
      icon: "fa-solid fa-user",
      url: "/profile",
    },
    {
      id: uuidv4(),
      title: "Settings",
      icon: "fa-solid fa-gear",
      url: "/settings",
    },
    {
      id: uuidv4(),
      title: "Enquiry",
      icon: "fa-solid fa-circle-question",
      url: "/enquiry",
    },
  ];
  return (
    <Box
      bg="#DEE2FF"
      w="100%"
      _dark={{
        bg: "transparent",
      }}
      className="p-16 mobile:px-4 bg-gradient-to-tr from-blue-500 to-purple-500 "
    >
      <Text
        fontFamily="Acharya-bold"
        className="font-extrabold text-3xl capitalize text-center mb-5 mobile:text-2xl"
      >
        Access Perks by Category
      </Text>
      <Box
        className="flex gap-10 text-center items-center justify-center flex-wrap"
        cursor="pointer"
      >
        {array.map((name) => (
          <Box
            key={name.id}
            minHeight="150px"
            minWidth="150px"
            className="relative p-4 w-fit bg-white rounded-lg overflow-hidden hover:shadow-xl flex flex-col justify-center items-center mobile:w-44"
            onClick={() => navigate(name.url)}
            _dark={{
              bg: "#23314d",
            }}
          >
            <Box
              className="category-box w-16 h-16 bg-gray-100 rounded-lg"
              _dark={{
                color: "black !important",
              }}
            >
              <i className={name.icon}></i>
            </Box>
            <Text
              _dark={{
                color: "white",
              }}
              className="mt-2 text-gray-800 text-md font-extrabold line-clamp-1"
            >
              {name.title}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { CategoryCard };
