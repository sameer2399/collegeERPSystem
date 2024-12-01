import { useFormik } from "formik";
import { EmailIcon, PasswordIcon, Buttons, Input } from "../../Components";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { getProfile, loginAction } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { encrypt } from "../../Utils/hashing";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, message } = useSelector((state) => state.login);
  let from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      auid: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await dispatch(
        loginAction({
          auid: await encrypt(values.auid),
          password: await encrypt(values.password),
        })
      );
      if (response) {
        return dispatch(getProfile()) && navigate(from, { replace: true });
      }
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.auid) {
        errors.auid = "Valid AUID is required";
      } else if (values.auid.length < 5) {
        errors.auid = "Enter valid AUID";
      }
      if (!values.password) {
        errors.password = "Valid password is required";
      } else if (values.password.length < 5) {
        errors.password = "Password must contain at least 5 characters.";
      }
      return errors;
    },
  });
  return (
    <div className="h-screen flex mobile:flex-col ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Acharya ERP</title>
      </Helmet>
      <Box
        className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center mobile:w-full mobile:h-full"
        _dark={{
          bg: "#23314d",
        }}
      >
        <div className="mobile: p-10">
          <h1 className="text-white font-bold text-4xl font-inherit">
            Acharya ERP
          </h1>
          <p className="text-white mt-1 w-auto">
            This is the minimal Acharya ERP, where acharyan's can access all the
            perks from there fingertip.
          </p>
          <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
            Read More
          </button>
        </div>
      </Box>
      <Box
        _dark={{
          bg: "transparent",
          color: "white",
        }}
        className="flex w-1/2 justify-center items-center bg-white mobile:w-full mobile:h-auto"
      >
        <form
          className="w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full "
          onSubmit={formik.handleSubmit}
          name="login"
        >
          <Text
            className="text-gray-800 font-bold text-xl mb-1"
            _dark={{
              color: "white",
            }}
          >
            Welcome Acharyan !
          </Text>
          <Text
            className="font-normal text-gray-600 text-xl mb-5"
            _dark={{
              color: "white",
            }}
          >
            Enter your AUID and password, to get started.
          </Text>
          {formik.touched.auid && formik.errors.auid ? (
            <Alert
              _dark={{
                color: "white",
                bg: "red.500",
              }}
              status="error"
              className="mb-3 rounded-xl"
            >
              <AlertIcon />
              <AlertTitle>{formik?.errors?.auid}</AlertTitle>
            </Alert>
          ) : null}
          {formik.touched.password && formik.errors.password ? (
            <Alert
              _dark={{
                color: "white",
                bg: "red.500",
              }}
              status="error"
              className="mb-3 rounded-xl"
            >
              <AlertIcon />
              <AlertTitle>{formik?.errors?.password}</AlertTitle>
            </Alert>
          ) : null}
          {!success && message ? (
            <Alert
              _dark={{
                color: "white",
                bg: success ? "green.500" : "red.500",
              }}
              status={success ? "success" : "error"}
              className="mb-3 rounded-xl"
            >
              <AlertIcon />
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          ) : null}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <EmailIcon />
            <Input
              type="auid"
              name="auid"
              onChange={formik.handleChange}
              value={formik.values.auid.toUpperCase()}
              onBlur={formik.handleBlur}
              placeholder="Enter AUID"
              autoComplete="off"
              className="pl-2 outline-none border-none ml-1 w-full bg-transparent font-bold"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <PasswordIcon />
            <Input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              id=""
              placeholder="Enter Password"
              autoComplete="off"
              className="pl-2 outline-none border-none ml-1 w-full bg-transparent"
            />
          </div>
          <Buttons className="mt-3" loading={loading} type="submit">
            Login
          </Buttons>
        </form>
      </Box>
    </div>
  );
};

export { Login };
