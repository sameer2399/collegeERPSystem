import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import { headerConfig } from "../../Utils/headerConfig";

export const initPayment = async (params, toast) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}/payment/init`,
      headers: headerConfig(),
      params: params,
    });
    if (!data.success) {
      return toast({
        title: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
    }
    return data.data;
  } catch (error) {
    toast({
      title: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
  }
};

export const makeFreeOrder = async (payload, toast) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseUrl}/events/book`,
      headers: headerConfig(),
      data: payload,
    });
    if (!data.success) {
      toast({
        title: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        zIndex: 110000000,
      });
      return false
    }
    return data.data;
  } catch (error) {
    toast({
      title: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      zIndex: 110000000,
    });
    return false
  }
};
