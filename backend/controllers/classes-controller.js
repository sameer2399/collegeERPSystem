import axios from "axios";
import Alive from "../services/alive-services.js";

// console.log(Alive);
// @desc    - Get all classes
// @route   GET /api/classes
// @access  Public

const getClasses = async (req, res) => {
  // const date = new Date();
  // let month = date.getMonth();
  // let year = date.getFullYear();
  // let todayDate = date.getDate();
  // try {
  //   const { data } = await axios({
  //     url: process.env.OFFLINE_CLASSES,
  //     method: "POST",
  //     headers: {
  //       token: req.headers.token,
  //     },
  //     data: {
  //       month: month + 1,
  //       year: year,
  //     },
  //   });
  //   if (!data.success) {
  //     return res.status(201).json({
  //       success: false,
  //       message: "Unable to retreive classes",
  //     });
  //   }
  try {
    const onlineClasses = await Alive.getOnlineClasses(req.headers.alivetoken);
    return res.status(200).json({
      success: true,
      message: "Classes retreive successfully",
      offlineClasses: [],
      onlineClasses: onlineClasses,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to retreive classes",
    });
  }
};

export { getClasses };
