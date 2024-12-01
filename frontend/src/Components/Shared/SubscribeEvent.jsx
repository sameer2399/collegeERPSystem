import { Input } from "../Input";
import { useFormik } from "formik";
import { Alert, AlertIcon, AlertTitle, Box, useToast } from "@chakra-ui/react";
import { Buttons } from "../Button";
import { useSelector } from "react-redux";
const SubscribeEvent = () => {
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: user?.acerp_email,
    },
    onSubmit: (values) => {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
  });
  return (
    <Box
      className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10"
      _dark={{
        bg: "#23314d",
      }}
    >
      <div className="flex p-16 mobile:flex-col mobile:p-4">
        <div className="flex justify-center md:justify-end w-1/2 mobile:w-full">
          <img
            className="mobile:w-full desktop:max-w-md"
            src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
            alt="Marketing newsletter via computer Illustration in PNG, SVG"
          />
        </div>
        <div className="flex items-center justify-end w-1/2 mobile:w-full mobile:mt-5">
          <div className="mx-auto md:mx-0 mobile:w-full">
            <h3 className="text-4xl font-bold text-white">Subscribe Us !</h3>
            <p className="mt-2 max-w-[20rem] mobile:max-w-full text-lg text-white/80">
              Join our subscribe list to get the latest event of Acharya. We
              will send you the notification.
            </p>
            <form onSubmit={formik.handleSubmit} className="mt-4 flex flex-col">
              <Input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email"
                className="w-full rounded border border-white/50 bg-transparent px-3 py-2 text-white placeholder:text-white/50 md:max-w-[18rem]"
              />
              {formik.touched.email && formik.errors.email ? (
                <Alert
                  _dark={{
                    color: "white",
                    bg: "red.500",
                  }}
                  status="error"
                  className="mt-3 rounded-xl"
                >
                  <AlertIcon />
                  <AlertTitle>{formik?.errors?.email}</AlertTitle>
                </Alert>
              ) : null}
              <Buttons type="submit" className="mt-4 w-full">
                Subscribe
              </Buttons>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export { SubscribeEvent };
