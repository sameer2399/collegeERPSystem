import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AttendenceHero, ErrorMessage } from "../../Components";
import AttendenceCard from "../../Components/Attendence/AttendenceCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance } from "../../Redux/Actions";
import { Helmet } from "react-helmet";
const Attendence = () => {
  const dispatch = useDispatch();
  const { loading, attendance, success, error, message } = useSelector(
    (state) => state.attendance
  );
  useEffect(() => {
    if (!success) {
      dispatch(fetchAttendance());
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  if (error && !success) {
    return (
      <ErrorMessage
        message={message}
        submessage={"Oops, Something went Wrong."}
      />
    );
  }
  const { data } = attendance;
  return (
    <Box className="p-10 mobile:p-4">
      <Helmet>
        <title>Attendance Detail - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <AttendenceHero
        overallAttendance={parseFloat(attendance?.Average_attendance).toFixed(
          2
        )}
      />
      <Box className="text-center">
        <Text className="my-10 text-2xl font-bold">Detailed Attendance</Text>
        <Box className="grid grid-cols-4 auto-cols-max gap-5 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 classgrid">
          {data?.map((subjects) => (
            <AttendenceCard
              key={subjects.subject_code}
              subjectName={subjects.subject_name}
              attendedClasses={subjects.present}
              totalClasses={subjects.total}
              bg="#1F2889"
              percentage={`${(subjects.present / subjects.total) * 100}%`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export { Attendence };
