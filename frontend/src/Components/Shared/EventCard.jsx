import { Box, Image, Text, useColorMode } from "@chakra-ui/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const EventCard = (props) => {
  const { title, category, slots, eventDate, timing, thumbnail, entryFee, id } =
    props.event;
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
      // Do something here
    }
    return navigate(`/events/${id}`);
  };
  return (
    <Box
      onClick={handleNavigate}
      bg="white"
      _dark={{
        bg: "#23314d",
      }}
      minWidth="auto"
      className="px-6 pt-6 pb-2 rounded-xl shadow-lg pointer mobile:min-w-full"
    >
      <div className="relative w-full">
        <Image
          height={"200px"}
          maxWidth={"300px"}
          className="mobile:min-w-full w-full object-cover rounded-xl lg:min-w-full xl:min-w-full"
          src={thumbnail}
          alt="Colors"
        />
        <p className="uppercase absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
          {category}
        </p>
      </div>
      <Text
        _dark={{
          color: "#fff",
        }}
        className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {title}
      </Text>
      <div className="my-4">
        <Box
          _dark={{
            color: "white",
          }}
          className="flex gap-2 items-center text-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 mb-1.5 max-h-min ${
                colorMode === "dark" ? "font-white" : "text-indigo-600"
              } `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <Text className="font-extrabold">
            {moment(eventDate).format("LL")} at{" "}
            {moment(timing, "h:mm a").format("h:mm a")}
          </Text>
        </Box>
        <Box
          _dark={{
            color: "white",
          }}
          className="flex gap-2 items-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 mb-1.5 ${
                colorMode === "dark" ? "font-white" : "text-indigo-600"
              } `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <p className="font-extrabold">{slots} Slots Left</p>
        </Box>
        <Box
          _dark={{
            color: "white",
          }}
          className="flex mt-1 gap-2 items-center"
        >
          <span>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mb-1.5 ${
                colorMode === "dark" ? "fill-white" : "fill-indigo-600"
              }  `}
              viewBox="0 0 447.185 447.185"
            >
              <g>
                <path
                  d="M358.204,96.283h-33.437c-2.211-19.379-8.961-37.519-19.672-51.56h53.108c12.721,0,23.022-9.499,23.022-22.216
		c0-12.723-10.302-22.484-23.022-22.484H178.118c-0.659,0-1.294-0.023-1.971-0.023c-0.438,0-0.877,0.023-1.315,0.023H88.981
		c-12.72,0-23.022,9.768-23.022,22.484s10.302,22.216,23.022,22.216h102.097c32.243,2.347,66.017,14.821,74.913,51.56H88.981
		c-12.72,0-23.022,10.309-23.022,23.031c0,12.717,10.302,23.031,23.022,23.031h174.716c-10.87,29.034-40.728,46.742-82.225,46.742
		h-45.788h-0.133h-26.699c-12.401,0-22.455,10.054-22.455,22.455c0,12.404,10.054,22.458,22.455,22.458h26.382
		c0.109,0.012,0.207,0.065,0.316,0.065h41.665c45.268,1.72,65.402,21.35,76.946,75.055c9.032,39.892,15.682,65.875,20.912,81.438
		c3.919,14.398,11.674,36.091,25.127,49.048c5.261,5.059,12.046,7.577,18.808,7.577c7.117,0,14.233-2.784,19.559-8.322
		c9.76-10.144,9.937-25.842,0.993-36.334c-0.041-0.124-0.023-0.26-0.088-0.384c-8.258-15.32-18.247-56.412-30.435-108.533
		c-9.688-42.381-27.787-68.778-55.213-80.499c34.437-13.22,58.127-38.506,67.412-70.772h36.966
		c12.721,0,23.022-10.314,23.022-23.031S370.925,96.283,358.204,96.283z"
                />
              </g>
            </svg>
          </span>
          <Text className="font-extrabold">
            {entryFee > 1 ? entryFee : "Free"}
          </Text>
        </Box>
        <button
          onClick={handleNavigate}
          className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
        >
          Book Now
        </button>
      </div>
    </Box>
  );
};

export { EventCard };
