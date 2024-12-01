import {
  Box,
  Button,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { ButtonQuickAction, ErrorMessage, SideBar } from "../../Components";
import { ViewBookings } from "./Components/Bookings/steps";
import { fetchAdminUser, removeAdminOrMods } from "../../Redux/Actions";
import moment from "moment";
import { itemsForUserMenu as Menu } from "./Utils/menus";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [clicked, setClicked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, success, data, error, message } = useSelector(
    (state) => state.adminuser
  );

  useEffect(() => {
    dispatch(fetchAdminUser());
  }, []);

  const handleClickAction = (data) => {
    const { auid, params, role } = data;
    if (params !== "VIEW_ORDERS") {
      dispatch(removeAdminOrMods({ auid, role, isNew: false }, toast));
      setClicked(true);
      return;
    }
    if (params === "VIEW_ORDERS") {
      dispatch({
        type: "SELECT_AUID_FOR_BOOKINGS",
        payload: auid,
      });
      onOpen();
    }
  };
  return (
    <Box className="min-h-screen flex flex-no-wrap">
      <Helmet>
        <title>Users Dashboard - Acharya ERP</title>
        <meta name="description" content="This is the home page." />
      </Helmet>
      <SideBar>
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        )}
        {error && (
          <ErrorMessage
            message={message}
            submessage={"Oops, Something went Wrong."}
          />
        )}
        {!loading && !error && success && (
          <Box className="p-5 mobile:p-3">
            <Text fontSize="2xl" fontWeight="extrabold">
              All Users
            </Text>
            {isOpen && <ViewBookings
              title="User Bookings"
              onClose={onClose}
              isOpen={isOpen}
            />}
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th className="text-left font-[Acharya-semi]  p-4 mobile:hidden">
                    S.no
                  </th>
                  <th className="text-left font-[Acharya-semi]  p-4">AUID</th>
                  <th className="text-left font-[Acharya-semi]  p-4 mobile:hidden">
                    Joined On
                  </th>
                  <th className="text-left font-[Acharya-semi] hidden p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user, index) => {
                  return (
                    <tr
                      key={user.auid}
                      tabIndex={0}
                      className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                      <td className="mobile:hidden">
                        <div className="flex items-center pl-5">
                          <Text className="text-base leading-none mr-2">
                            {index + 1}
                          </Text>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center pl-5">
                          <p className="text-base font-bold leading-none mr-2">
                            {user.auid}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5 mobile:hidden lg:table-cell">
                        <p
                          className={`capitalize py-3 px-3 text-sm focus:outline-none leading-none rounded `}
                        >
                          {moment(user.createdAt).format("LL")}
                        </p>
                      </td>
                      <td className="whitespace-normal w-fit">
                        <ButtonQuickAction
                          title="Manage User"
                          isClicked={clicked}
                          setClicked={setClicked}
                        >
                          {Menu.map((item, index) => {
                            return (
                              <Button
                                key={index}
                                onClick={(e) =>
                                  handleClickAction({
                                    ...item,
                                    auid: user.auid,
                                  })
                                }
                                w="100%"
                                className="mb-2"
                              >
                                {item.name}
                              </Button>
                            );
                          })}
                        </ButtonQuickAction>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        )}
      </SideBar>
    </Box>
  );
};

export { AdminUsers };
