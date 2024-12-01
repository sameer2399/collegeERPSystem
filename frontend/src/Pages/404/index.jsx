import { Box, Text, Button } from "@chakra-ui/react";
const Error = () => {
  return (
    <div class="h-auto desktop:px-24 desktop:py-24 py-24 md:py-20 md:px-44 px-4 items-center flex justify-center flex-col-reverse desktop:flex-row md:gap-28 gap-16 mobile:flex-col">
      <div class="mobile:w-full xl:w-1/2 relative desktop:pb-0">
        <div class="relative">
          <div class="absolute">
            <Box
              _dark={{
                color: "white",
              }}
              class=""
            >
              <Text
                _dark={{
                  color: "red.200",
                }}
                class="my-2  font-bold text-2xl"
              >
                Looks like you've found the doorway to the great nothing
              </Text>
              <Text
                _dark={{
                  color: "voilet.200",
                }}
                class="my-2"
              >
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </Text>
              <Button
                _dark={{
                  bg: "blue.800",
                  color: "white",
                }}
                class="sm:w-full desktop:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
              >
                Take me there!
              </Button>
            </Box>
          </div>
          <div>
            <img className="w-full" src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img
          className="mobile:min-w-md"
          src="https://i.ibb.co/ck1SGFJ/Group.png"
        />
      </div>
    </div>
  );
};

export { Error };
