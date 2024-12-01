import "./style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hamburger from "../Hamburger";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useColorMode, Button, Box, Text } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Actions";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setNav] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [deviceType, setDeviceType] = useState("desktop");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isSuper, setSuper] = useState(false);
  useEffect(() => {
    if (user?.role) {
      if (user?.role === "ADMIN" || user?.role === "MODERATOR") {
        setSuper(true);
      }
    }
    updateDeviceType(window.innerWidth);
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      updateDeviceType(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateDeviceType(window.innerWidth);
      });
    };
  });
  const pushToHome = () => {
    navigate("/");
  };

  const openDropdown = () => {
    setIsOpen((old) => !old);
  };

  const handleLogout = () => {
    if (showNav) {
      setNav(false);
    }
    dispatch(logoutUser());
  };

  const hideNav = () => {
    setNav(false);
  };
  const updateDeviceType = (width) => {
    if (width >= 768) {
      setDeviceType("desktop");
      hideNav();
      return;
    }
    setDeviceType("mobile");
  };

  useEffect(() => {
    if (showNav === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showNav]);
  const navVariants = {
    hidden: { y: -10, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 1,
        type: "tween",
        staggerChildren: 0.5,
      },
    },
  };

  const getFirstName = (name) => name.split(" ")[0];

  return (
    <>
      <AnimatePresence>
        {true ? (
          <motion.nav
            initial="hidden"
            animate="show"
            variants={navVariants}
            exit="hidden"
            className={`${deviceType === "mobile" ? "mobile-nav" : ""}`}
          >
            {deviceType === "desktop" ? (
              <motion.div className="desktop-navbar px-12 lg:px-6 xl:px-8 ">
                <motion.div className="navheader">
                  <h1
                    onClick={pushToHome}
                    className="logo pointer text-3xl lg:text-2xl mobile:text-xl"
                  >
                    Acharya
                  </h1>
                </motion.div>
                <motion.div className="navitems relative lg:gap-5 desktop:gap-7">
                  <Link className="font-bold" to={"/"}>
                    Home
                  </Link>
                  <Link className="font-bold" to={"/events"}>
                    Events
                  </Link>
                  <Link className="font-bold" to={"/attendance"}>
                    Attendance
                  </Link>
                  <Link className="font-bold" to={"/class"}>
                    Classes
                  </Link>
                  {isAuthenticated ? (
                    <div className="flex items-center md:order-2 relative">
                      <button
                        type="button"
                        className={`justify-center text-center items-center p-2 font-bold flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300  bg-[#DEE2FF] dark:bg-[#23314d]`}
                        id="user-menu-button"
                        aria-expanded="false"
                        onClick={openDropdown}
                        data-dropdown-toggle="dropdown"
                      >
                        <span className="mr-2 ml-2 font-auto">
                          Hi, {getFirstName(user.student_name)}
                        </span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`https://www.acharyainstitutes.in/${user.photo}`}
                          alt="user photo"
                        />
                      </button>
                      {isOpen ? (
                        <Box
                          bottom={{
                            base: isSuper ? "-210" : "-180",
                          }}
                          width="100%"
                          _dark={{
                            bg: "#DEE2FF",
                          }}
                          className="z-50 g-5 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute"
                        >
                          <ul className="py-1" aria-labelledby="dropdown">
                            <li>
                              <Link
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                                to={"/profile"}
                                onClick={() => setIsOpen(false)}
                              >
                                My Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                                to={"/my-bookings"}
                                onClick={() => setIsOpen(false)}
                              >
                                My Bookings
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                                to={"/settings"}
                                onClick={() => setIsOpen(false)}
                              >
                                Settings
                              </Link>
                            </li>
                            {isSuper ? (
                              <li>
                                <Link
                                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                                  to={"/admin/home"}
                                  onClick={() => setIsOpen(false)}
                                >
                                  Manage Admin
                                </Link>
                              </li>
                            ) : null}
                            <li>
                              <Text
                                onClick={handleLogout}
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                              >
                                Signout
                              </Text>
                            </li>
                          </ul>
                        </Box>
                      ) : null}
                    </div>
                  ) : (
                    <Link className="font-bold" to={"/login"}>
                      Login
                    </Link>
                  )}
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="mobile-menu">
                <div className="navbar">
                  <div className="navbar-container">
                    <Link to="/">
                      <div className="navbar-logo">
                        <h1 onClick={pushToHome} className="logo pointer">
                          Acharya
                        </h1>
                      </div>
                    </Link>
                    <div className="navbar-items">
                      <Hamburger
                        onClick={() => {
                          setNav(!showNav);
                        }}
                        show={showNav}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showNav ? (
          <motion.div
            className="mobile-nav-container"
            initial={{
              x: "100%",
            }}
            animate={{
              x: "calc(100vw - 50%)",
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
          >
            <motion.div className="mobnavitems">
              <Hamburger
                onClick={() => {
                  setNav(!showNav);
                }}
                show={showNav}
              />
              <div className="mobile-nav-items flex flex-col">
                <Link
                  onClick={() => setNav(false)}
                  className="font-bold"
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  className="font-bold"
                  to={"/events"}
                >
                  Events
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  className="font-bold"
                  to={"/attendance"}
                >
                  Attendance
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  className="font-bold"
                  to={"/class"}
                >
                  Classes
                </Link>
                {!isAuthenticated && (
                  <Link
                    onClick={() => setNav(false)}
                    className="font-bold"
                    to={"/login"}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
            {isAuthenticated && (
              <div className="w-1/2 flex items-center md:order-2 flex-col">
                <button
                  type="button"
                  className={`w-full justify-center text-center items-center p-2 font-bold flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:bg-[#23314d] bg-[#DEE2FF]`}
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={openDropdown}
                  data-dropdown-toggle="dropdown"
                >
                  <span className="mr-2 ml-2 font-auto">
                    Hi, {getFirstName(user.student_name)}
                  </span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`https://www.acharyainstitutes.in/${user.photo}`}
                    alt="user photo"
                  />
                </button>
                {isOpen ? (
                  <Box
                    width="100%"
                    _dark={{
                      bg: "#DEE2FF",
                      color: "black",
                    }}
                    className="z-50 g-5 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul className="py-1" aria-labelledby="dropdown">
                      <li>
                        <Link
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                          to={"/profile"}
                          onClick={() => setIsOpen(false) || setNav(false)}
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                          to={"/my-bookings"}
                          onClick={() => setIsOpen(false) || setNav(false)}
                        >
                          My Bookings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                          to={"/settings"}
                          onClick={() => setIsOpen(false) || setNav(false)}
                        >
                          Settings
                        </Link>
                      </li>
                      {isSuper ? (
                        <li>
                          <Link
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                            to={"/admin/home"}
                            onClick={() => setIsOpen(false) || setNav(false)}
                          >
                            Manage Admin
                          </Link>
                        </li>
                      ) : null}
                      <li>
                        <Text
                          onClick={handleLogout}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white"
                        >
                          Signout
                        </Text>
                      </li>
                    </ul>
                  </Box>
                ) : null}
              </div>
            )}
            <Button
              w={"50%"}
              onClick={() => toggleColorMode() || setNav(false)}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export { Navbar };
