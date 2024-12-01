import {
  Box,
  Flex,
  Select,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Buttons } from "../../Components";
import { newEvent } from "../../Redux/Actions";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
const AddEvent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, message, success } = useSelector((state) => state.newEvent);
  const formik = useFormik({
    initialValues: {
      title: "",
      thumbnail: "",
      category: "",
      slots: "",
      entryFee: "",
      venue: "",
      eventDate: "",
      timing: "",
      organisedBy: user.auid,
      description: "",
      rules: "",
    },
    onSubmit: async (values) => {
      const response = await dispatch(newEvent(values));
      if (response) {
        handleClearForm();
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.title) {
        errors.title = "Event name is Required";
      }
      if (!values.category) {
        errors.category = "Category is Required";
      }
      if (!values.slots) {
        errors.slots = "Slots is Required";
      }
      if (values.entryFee === "") {
        errors.entryFee = "Entry Fee is Required";
      }
      if (!values.venue) {
        errors.venue = "Venue is Required";
      }
      if (!values.eventDate) {
        errors.eventDate = "Event Date is Required";
      }
      if (!values.timing) {
        errors.timing = "Start Time is Required";
      }
      if (!values.thumbnail) {
        errors.thumbnail = "Thumbnail is Required";
      }
      if (!values.description) {
        errors.description = "Description is Required";
      }
      if (!values.rules) {
        errors.rules = "Rules is Required";
      }
      return errors;
    },
  });
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      formik.setFieldValue("thumbnail", reader.result);
    };
  };
  const isInvalid = (name) => {
    return formik.errors[name] && formik.touched[name];
  };
  const handleClearForm = () => {
    formik.resetForm();
  };
  const categoryOfEvents = [
    {
      id: uuidv4(),
      name: "Gaming",
    },
    {
      id: uuidv4(),
      name: "Quiz",
    },
    {
      id: uuidv4(),
      name: "Music",
    },
    {
      id: uuidv4(),
      name: "Life Style",
    },
    {
      id: uuidv4(),
      name: "Mestori",
    },
    {
      id: uuidv4(),
      name: "PhotoGraphy",
    },
    {
      id: uuidv4(),
      name: "Technical Fest",
    },
    {
      id: uuidv4(),
      name: "Acharya Habba",
    },
    {
      id: uuidv4(),
      name: "Literary And Dramatics",
    },
    {
      id: uuidv4(),
      name: "Dance",
    },
    {
      id: uuidv4(),
      name: "Singing",
    },
    {
      id: uuidv4(),
      name: "Sports",
    },
    {
      id: uuidv4(),
      name: "Essay and Writing",
    },
    {
      id: uuidv4(),
      name: "Seminar",
    },
    {
      id: uuidv4(),
      name: "Others",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch({
        type: "NEW_EVENT_CLEAR",
      });
    };
  }, [dispatch]);
  return (
    <Box className="p-10 mobile:p-4 items-center  font-bold min-h-screen flex flex-col text-center ">
      <Helmet>
        <title>Add Events - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <Box className="w-2/4 mobile:w-full xl:w-3/4">
        <form onSubmit={formik.handleSubmit}>
          {formik.values.thumbnail && (
            <FormLabel htmlFor="dropzone-file">Event Thumbnail</FormLabel>
          )}
          {!formik.values.thumbnail ? (
            <FormControl isInvalid={isInvalid("thumbnail")}>
              <FormLabel htmlFor="dropzone-file">Event Thumbnail</FormLabel>
              <FormLabel
                htmlFor="dropzone-file"
                alignItems="center"
                textAlign={"center"}
                display={"flex"}
                width="100%"
                _dark={{
                  bg: "transparent",
                }}
                className={`mx-auto cursor-pointer flex-col rounded-xl border-2 border-dashed border-blue-400 p-6 ${
                  isInvalid("thumbnail") ? "border-red-400" : "border-blue-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <Text
                  _dark={{
                    color: "white",
                  }}
                  className="mt-4 text-xl font-medium text-gray-700 tracking-wide"
                >
                  Upload Thumbnail
                </Text>
                <Text
                  _dark={{
                    color: "white",
                  }}
                  className="mt-2 text-gray-500 tracking-wide"
                >
                  Upload or darg &amp; drop your file SVG, PNG, JPG or JPEG.
                </Text>
                <input
                  id="dropzone-file"
                  name="thumbnail"
                  onChange={handleAvatar}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </FormLabel>
              {formik.touched.thumbnail && formik.errors.thumbnail && (
                <FormErrorMessage>{formik.errors.thumbnail}</FormErrorMessage>
              )}
            </FormControl>
          ) : (
            <Box className="flex flex-col items-center justify-center border-2 border-gray.400 relative">
              <img
                src={formik.values.thumbnail}
                alt="thumbnail"
                className="w-full h-auto rounded-xl"
              />
              <p
                onClick={() => {
                  formik.setFieldValue("thumbnail", "");
                }}
                className="mt-4 text-gray-500 absolute -top-2 right-5 pointer"
                variantColor="blue"
                variant="outline"
              >
                X
              </p>
            </Box>
          )}
          <FormControl isInvalid={isInvalid("title")}>
            <FormLabel mt={4} htmlFor="title">
              Enter Event Title
            </FormLabel>
            <Input
              id="title"
              type="title"
              name="title"
              onChange={formik.handleChange}
              placeholder="Event Title"
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isInvalid("description")}>
            <FormLabel mt={4} htmlFor="description">
              Enter Event Description
            </FormLabel>
            <Textarea
              id="description"
              type="description"
              name="description"
              onChange={formik.handleChange}
              placeholder="Event description"
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isInvalid("rules")}>
            <FormLabel mt={4} htmlFor="rules">
              Enter Event Rules
            </FormLabel>
            <Textarea
              id="rules"
              type="rules"
              name="rules"
              onChange={formik.handleChange}
              placeholder="Event rules"
              value={formik.values.rules}
            />
            {formik.touched.rules && formik.errors.rules && (
              <FormErrorMessage>{formik.errors.rules}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isInvalid("category")}>
            <FormLabel className="mt-4" htmlFor="category">
              Select Category
            </FormLabel>
            <Select
              id="category"
              onChange={formik.handleChange}
              name="category"
              placeholder="Select Category"
              value={formik.values.category}
            >
              {categoryOfEvents.map((option) => (
                <option key={option.id}>{option.name}</option>
              ))}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
            )}
          </FormControl>
          <Flex mt="4" justifyContent={"space-between"} gap="5">
            <Box className="w-full">
              <FormControl isInvalid={isInvalid("slots")}>
                <FormLabel htmlFor="slots">Enter Total Slots</FormLabel>
                <Input
                  id="slots"
                  type="number"
                  name="slots"
                  value={formik.values.slots}
                  onChange={formik.handleChange}
                  placeholder="Total Slots"
                />
                {formik.touched.slots && formik.errors.slots && (
                  <FormErrorMessage>{formik.errors.slots}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box className="w-full">
              <FormControl isInvalid={isInvalid("entryFee")}>
                <FormLabel htmlFor="entryFee">Enter Entry Fee</FormLabel>
                <Input
                  id="entryFee"
                  name="entryFee"
                  type="number"
                  value={formik.values.entryFee}
                  onChange={formik.handleChange}
                  placeholder="Total Fee"
                />
                {formik.touched.entryFee && formik.errors.entryFee && (
                  <FormErrorMessage>{formik.errors.entryFee}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Flex>
          <FormControl isInvalid={isInvalid("venue")}>
            <FormLabel mt="4" htmlFor="venue">
              Enter Event Venue
            </FormLabel>
            <Input
              id="venue"
              type="venue"
              name="venue"
              value={formik.values.venue}
              onChange={formik.handleChange}
              placeholder="Event Venue"
            />
            {formik.touched.venue && formik.errors.venue && (
              <FormErrorMessage>{formik.errors.venue}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel mt="4" htmlFor="organisedBy">
              Organised By
            </FormLabel>
            <Input
              id="organisedBy"
              type="organisedBy"
              value={user.auid}
              disabled={true}
            />
          </FormControl>
          <Flex mt="4" justifyContent={"space-between"} gap="5">
            <Box className="w-full">
              <FormControl isInvalid={isInvalid("eventDate")}>
                <FormLabel htmlFor="eventDate">Event Date</FormLabel>
                <Input
                  id="eventDate"
                  type="date"
                  name="eventDate"
                  value={formik.values.eventDate}
                  onChange={formik.handleChange}
                  placeholder="Start Time"
                />
                {formik.touched.eventDate && formik.errors.eventDate && (
                  <FormErrorMessage>{formik.errors.eventDate}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box className="w-full">
              <FormControl isInvalid={isInvalid("timing")}>
                <FormLabel htmlFor="timing">Event Time</FormLabel>
                <Input
                  id="timing"
                  type="time"
                  name="timing"
                  value={formik.values.timing}
                  onChange={formik.handleChange}
                  placeholder="Start time"
                />
                {formik.touched.timing && formik.errors.timing && (
                  <FormErrorMessage>{formik.errors.timing}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Flex>
          {!loading && message ? (
            <Alert
              _dark={{
                color: "white",
                bg: success ? "green.500" : "red.500",
              }}
              status={success ? "success" : "error"}
              className="mb-3 rounded-xl mt-5"
            >
              <AlertIcon />
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          ) : null}
          <Buttons loading={loading} className="w-full mt-5" type="submit">
            Submit
          </Buttons>
        </form>
      </Box>
    </Box>
  );
};

export { AddEvent };
