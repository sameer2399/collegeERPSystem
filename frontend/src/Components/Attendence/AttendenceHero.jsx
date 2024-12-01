import { Box, Text } from "@chakra-ui/react";
import PieChart from "../Shared/Charts/PieChart";
import { pieChartOptions } from "../Shared/Charts/PiechartData.js";
const AttendenceHero = (props) => {
  const attendanceData = [
    parseFloat(props?.overallAttendance ? props.overallAttendance : 0),
    100 - props.overallAttendance,
  ];
  console.log(attendanceData);
  return (
    <Box
      _dark={{
        background: "rgba(0, 0, 0, 0.1)",
      }}
      className="flex w-full bg-blue-700 p-10 mobile:flex-col mobile:p-4 gap-2 rounded-xl"
    >
      <Box className="w-1/2 flex flex-col justify-center items-center mobile:w-full">
        <div className="md:col-span-2 lg:col-span-1 w-full h-full">
          <Box
            _dark={{
              bg: "#23314d",
            }}
            className="min-h-full py-8 px-6 space-y-6 rounded-xl border bg-white flex flex-col justify-center items-center"
          >
            <PieChart
              chartData={attendanceData}
              chartOptions={pieChartOptions}
              className="w-40 opacity-75"
            />
            <div>
              <Text
                _dark={{
                  color: "white",
                }}
                className="text-2xl font-bold text-gray-600 text-center"
              >
                Overall Attendance
              </Text>
              <div className="mt-2 flex justify-center">
                <Text
                  _dark={{
                    color: "white",
                  }}
                  className="text-3xl font-bold text-gray-700"
                >
                  {props.overallAttendance} %
                </Text>
              </div>
            </div>
          </Box>
        </div>
      </Box>
      <Box className="w-1/2 flex flex-col justify-center items-center mobile:hidden">
        <Box
          _dark={{
            bg: "#23314d",
          }}
          className="h-full py-8 px-6 space-y-6 rounded-xl border bg-white"
        >
          <div className="flex justify-center flex-col">
            <h1 className="text-2xl font-bold mb-4">Rules of Uses.</h1>
            <ul className="font-bold">
              <li className="mb-2">
                I. This stats are directly linked to official Acharya ERP. We're
                just trying to improve the User Experience.
              </li>
              <li className="mb-2">
                II. If you found any bug, please report it to us. We'll fix it
                until we can. Either for your Attendance you can report to your
                respected HODs and Proctors.
              </li>
              <li className="mb-2">
                III. If you found any bug, please report it to us. We'll fix it
                until we can. Either for your Attendance you can report to your
                respected HODs and Proctors.
              </li>
              <li>
                IV. If any discrepancy is found in your attendance, please bring
                it to the attention of the HODs and Proctors.
              </li>
            </ul>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export { AttendenceHero };
