import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../../Redux/Actions";
import { useEffect } from "react";
import { ClassCard, ErrorMessage } from "../../Components";
import { Helmet } from "react-helmet";
const Classes = () => {
  const dispatch = useDispatch();
  const { loading, classes, error, success, message } = useSelector(
    (state) => state.classes
  );
  const { onlineClasses, offlineClasses } = classes;
  useEffect(() => {
    if (!success) {
      dispatch(fetchClasses());
    }
    window.scrollTo(0, 0);
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
  return (
    <Box className="min-h-screen p-10 mobile:p-4">
      <Helmet>
        <title>Classes - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <Box>
        <Text className="text-2xl font-bold font-[Acharya-bold]">
          Your Offline Classes
        </Text>
        {offlineClasses.length == 0 ? (
          <Box className="h-40 flex justify-center text-center items-center">
            <Text className="font-bold text-xl">No Offline Classes Today.</Text>
          </Box>
        ) : (
          <Box className="grid grid-cols-4 auto-cols-max gap-5 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {offlineClasses?.map((eachClasses) => (
              <ClassCard
                key={eachClasses.time_table_id}
                bg="#1F2889"
                date={eachClasses.selected_date}
                subjectName={eachClasses.subject_name}
                time={eachClasses.interval}
              />
            ))}
          </Box>
        )}
      </Box>
      <Box className="mt-5">
        <Text className="text-2xl font-bold font-[Acharya-bold]">
          Your Online Classes
        </Text>
        {onlineClasses.length == 0 ? (
          <Box className="h-40 flex justify-center text-center items-center">
            <Text className="font-bold text-xl">No Online Classes Today.</Text>
          </Box>
        ) : (
          onlineClasses?.map((eachClasses) => (
            <ClassCard
              bg="#1F2889"
              date={eachClasses.selected_date}
              subjectName={eachClasses.subject_name}
              time={eachClasses.interval}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export { Classes };
