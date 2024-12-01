import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { menuItems } from "./menuItems";
import { Link } from "react-router-dom";
const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  const { user } = useSelector((state) => state.auth);
  const { role } = user;
  useEffect(() => {
    updateDeviceType(window.innerWidth);
    window.addEventListener("resize", () => {
      updateDeviceType(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateDeviceType(window.innerWidth);
      });
    };
  });
  const updateDeviceType = (width) => {
    if (width >= 768) {
      setDeviceType("desktop");
      return;
    }
    setDeviceType("mobile");
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-no-wrap">
        {deviceType === "desktop" && (
          <Box
            style={{ minHeight: "716px" }}
            className="w-64 relative md:relative bg-[#DEE2FF] shadow md:h-full flex-col justify-between flex"
            _dark={{
              bg: "#23314d",
            }}
          >
            <div className="px-8">
              <ul className="mt-12">
                {menuItems
                  .filter((item) => item.role === role)
                  .map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex w-full justify-between hover:text-gray-500 cursor-pointer items-center mb-6"
                      >
                        <Link
                          to={item.url}
                          className="flex font-semibold items-center focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          {item.icon && <item.icon />}
                          <span className="text-md ml-2 ">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Box>
        )}
        {deviceType === "mobile" && (
          <Box
            className="w-64 z-40 absolute bg-[#DEE2FF] shadow md:h-full flex-col justify-between mobile:flex transition duration-150 ease-in-out"
            id="mobile-nav"
            style={{
              transform: isOpen ? "translateX(0px)" : "translateX(-260px)",
            }}
            _dark={{
              bg: "#23314d",
              color: "black",
            }}
          >
            <button
              aria-label="toggle sidebar"
              id="openSideBar"
              className="hidden h-10 w-10 bg-gray-800 absolute right-0 mt-12 -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800"
              onClick={() => setIsOpen((open) => !open)}
              style={{
                display: !isOpen ? "flex" : "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-adjustments"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FFFFFF"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx={6} cy={10} r={2} />
                <line x1={6} y1={4} x2={6} y2={8} />
                <line x1={6} y1={12} x2={6} y2={20} />
                <circle cx={12} cy={16} r={2} />
                <line x1={12} y1={4} x2={12} y2={14} />
                <line x1={12} y1={18} x2={12} y2={20} />
                <circle cx={18} cy={7} r={2} />
                <line x1={18} y1={4} x2={18} y2={5} />
                <line x1={18} y1={9} x2={18} y2={20} />
              </svg>
            </button>
            <button
              aria-label="Close sidebar"
              id="closeSideBar"
              className="h-10 w-10 bg-gray-800 absolute right-0 mt-12 -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white"
              onClick={() => setIsOpen((open) => !open)}
              style={{
                display: !isOpen ? "none" : "flex",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </button>
            {isOpen && (
              <div className="px-8 h-screen">
                <ul className="mt-12">
                  {menuItems
                    .filter((item) => item.role === role)
                    .map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex w-full justify-between  hover:text-gray-300 cursor-pointer items-center mb-6"
                        >
                          <Link
                            to={item.url}
                            className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                          >
                            {item.icon && <item.icon />}
                            <span className="text-sm ml-2">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </Box>
        )}
        <div className="mx-auto h-auto md:w-4/5 w-11/12 px-5 mobile:w-full mobile:min-h-screen mb-5">
          <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SideBar };
