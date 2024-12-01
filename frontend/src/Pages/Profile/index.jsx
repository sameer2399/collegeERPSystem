import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto my-5 p-5 h-auto">
      <Helmet>
        <title>My Profile - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <div className="desktop:flex no-wrap desktop:-mx-2 ">
        <Box className="w-full md:w-3/12 md:mx-2">
          <Box
            bg={"#DEE2FF"}
            _dark={{
              bg: "#23314d",
            }}
            className="p-4 rounded-md"
          >
            <div className="image overflow-hidden">
              <img
                className="h-32 w-32 rounded-xl mx-auto"
                src={`https://www.acharyainstitutes.in/${user.photo}`}
                alt="userProfile"
              />
            </div>
            <Text
              _dark={{
                color: "white",
              }}
              className="text-gray-900 font-bold text-xl leading-8 my-1 text-center mt-5"
            >
              {user?.student_name}
            </Text>
            <Text
              _dark={{
                color: "white",
              }}
              className="text-gray-600 font-lg text-semibold leading-6 text-center font-bold"
            >
              Student in, {user.course}
            </Text>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
            <ul className="bg-gray-100 dark:bg-[#1a202c] dark:text-white text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Current Year/Semester</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    {user.section}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Date of Admission</span>
                <span className="ml-auto">{user.date_of_admission}</span>
              </li>
              <li className="flex items-center py-3">
                <span>Proctor Name</span>
                <span className="ml-auto">
                  {user?.proctor_name ? user.proctor_name : "Not Assigned"}
                </span>
              </li>
            </ul>
          </Box>
          <div className="my-4" />
        </Box>

        <Box className="w-full md:w-9/12 mx-2 h-auto mobile:m-0">
          <Box
            bg={"#DEE2FF"}
            _dark={{
              bg: "#23314d",
              color: "white",
            }}
            className="p-3 shadow-sm rounded-md"
          >
            <Box
              _dark={{
                color: "white",
              }}
              className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 ml-3"
            >
              <span clas="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <Text className="tracking-wide mb-1">About You</Text>
            </Box>
            <div className="text-gray-700">
              <Box
                _dark={{
                  color: "white",
                }}
                className="grid md:grid-cols-2 text-sm"
              >
                <Box className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">USN</div>
                  <div className="px-4 py-2">
                    {user?.usn ? user.usn : "Not Assigned"}
                  </div>
                </Box>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Father's Name</div>
                  <div className="px-4 py-2">{user.father_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Mother's Name</div>
                  <div className="px-4 py-2">{user.mother_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Parent Contact No.
                  </div>
                  <div className="px-4 py-2">+91 {user.parents_mobile}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Your Contact No.
                  </div>
                  <div className="px-4 py-2">+91 {user.mobile}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">{user.local_address}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Permanant Address
                  </div>
                  <div className="px-4 py-2">{user.permanant_address}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">{user.acerp_email}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">{user.dateofbirth}</div>
                </div>
              </Box>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};
