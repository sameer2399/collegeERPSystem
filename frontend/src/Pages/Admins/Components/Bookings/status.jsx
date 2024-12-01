import { Text } from "@chakra-ui/react";

export const BookingStatus = (props) => {
  switch (props.status) {
    case "cancelled":
      return (
        <div className="w-10 bg-red-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-7 mobile:left-[40%] mobile:top-2">
            Cancelled
          </Text>
        </div>
      );
    case "pending":
      return (
        <div className="w-10 bg-orange-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-4 mobile:left-[40%] mobile:top-2">
            Pending
          </Text>
        </div>
      );
    case "confirmed":
      return (
        <div className="w-10 bg-green-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-7 mobile:left-[40%] mobile:top-2">
            Confirmed
          </Text>
        </div>
      );
    case "completed":
      return (
        <div className="w-10 bg-green-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-7 mobile:left-[40%] mobile:top-2">
            Completed
          </Text>
        </div>
      );
    case "active":
      return (
        <div className="w-10 bg-green-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-3 mobile:left-[40%] mobile:top-2">
            Active
          </Text>
        </div>
      );
    default:
      return (
        <div className="w-10 bg-green-500 rounded-l-lg mobile:w-full mobile:rounded-t-lg mobile:h-10 block mx-0 relative">
          <Text className="absolute uppercase rotate-90 mobile:rotate-0 font-[Acharya-bold] bg-none top-[45%] -left-5 mobile:left-[40%] mobile:top-2">
            Pending
          </Text>
        </div>
      );
  }
};
