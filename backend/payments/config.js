const paytmParams = (orderId, email, phone, amount, auid) => {
  return {
    MID: process.env.PAYTM_MID,
    ORDER_ID: orderId,
    CUST_ID: auid,
    INDUSTRY_TYPE_ID: "Retail",
    CHANNEL_ID: "WEB",
    TXN_AMOUNT: amount,
    WEBSITE: "WEBSTAGING",
    CALLBACK_URL: `${process.env.BACKEND_URL}v1/api/payment/verify`,
    EMAIL: email,
    MOBILE_NO: phone,
    // CUST_NAME: name,
  };
};

export default paytmParams;
