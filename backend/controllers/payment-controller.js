import Event from "../models/event.js";
import Booking from "../models/bookings.js";
import paytmParams from "../payments/config.js";
import https from "https";
import PaytmCheckSum from "../payments/checkSums.js";

const makePayment = async (req, res) => {
  const { name, email, phone, amount, eventId, auid, orderId } = req.query;
  try {
    PaytmCheckSum.generateSignature(
      paytmParams(orderId, email, phone, amount, auid),
      process.env.PAYTM_MERCHANT_KEY,
      function (err, checksum) {
        var params = {
          ...paytmParams(orderId, email, phone, amount, auid),
          CHECKSUMHASH: checksum,
        };
        // Save user in DB
        const order = new Booking({
          orderId,
          name,
          email,
          phone,
          auid,
          event: eventId,
          status: "pending",
          paymentMode: "Online",
        });
        order.save();
        res.json({
          success: true,
          message: "Payment proceed",
          data: params,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};

const verifyPayment = async (request, response) => {
  let paytmCheckSum = request.body.CHECKSUMHASH;
  var isVerifySignature = PaytmCheckSum.verifySignature(
    request.body,
    process.env.PAYTM_MERCHANT_KEY,
    paytmCheckSum
  );
  if (isVerifySignature) {
    var paytmParams = {};
    paytmParams["MID"] = request.body.MID;
    paytmParams["ORDERID"] = request.body.ORDERID;

    PaytmCheckSum.generateSignature(
      paytmParams,
      process.env.PAYTM_MERCHANT_KEY,
      function (checksum) {
        var post_data = JSON.stringify(paytmParams);

        var options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var res = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            res += chunk;
          });

          post_res.on("end", async function () {
            let result = JSON.parse(res);
            if (result.STATUS == "TXN_SUCCESS") {
              const mainBooking = await Booking.findOne({
                orderId: result.ORDERID,
              });
              const event = await Event.findById(mainBooking.event);
              if (event.slots > 0) {
                event.slots--;
                await event.save();
                await Booking.findOneAndUpdate(
                  { orderId: result.ORDERID },
                  { status: "confirmed", paymentDetails: result }
                );
              } else {
                await Booking.findOneAndUpdate(
                  { orderId: result.ORDERID },
                  { status: "failed", paymentDetails: result }
                );
              }
            }
            if (result.STATUS == "TXN_FAILURE") {
              await Booking.findOneAndUpdate(
                { orderId: result.ORDERID },
                { status: "failed", paymentDetails: result }
              );
            }
            response.redirect(
              `${process.env.CLIENT_URL}orderStatus/${result.ORDERID}`
            );
          });
        });
        post_req.write(post_data);
        post_req.end();
      }
    );
  } else {
    return response.status(400).json({
      success: true,
      message: "Checksum Mismatched",
      data: request.body,
    });
  }
};

export { makePayment, verifyPayment };
