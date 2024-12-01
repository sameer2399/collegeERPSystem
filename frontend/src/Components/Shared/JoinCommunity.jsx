import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const JoinCommunity = () => {
  const navigate = useNavigate();
  const navigateToPage = () => navigate("/join-community");
  return (
    <Box className="w-full flex justify-center">
      <Box
        p={10}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700"
        _dark={{
          bg: "#23314d",
        }}
      >
        <div>
          <div className="flex items-center mobile:flex-col">
            <div className="w-full flex-col md:block flex items-center justify-center pt-4 mobile:mb-10">
              <div>
                <Text className="text-white font-extrabold mobile:text-3xl text-2xl desktop:text-3xl lg:w-10/12  leading-6 lg:leading-10 md:text-left text-center">
                  Become a member and start building the next big thing
                  together.
                </Text>
              </div>
              <Button
                _dark={{
                  color: "white",
                  bg: "gray-600",
                }}
                onClick={navigateToPage}
                role="button"
                aria-label="Join the community"
                className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 font-bold text-indigo-700 rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
              >
                Join the community
              </Button>
            </div>
            <div className="md:w-1/3 w-2/3 flex justify-center">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/CTA.png"
                alt="cartoon avatars"
                className="desktop:max-w-xs"
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export { JoinCommunity };
