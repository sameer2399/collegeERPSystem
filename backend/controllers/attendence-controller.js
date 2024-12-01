import axios from "axios";

// @desc    - User attendance
// @route   POST /api/attendance
// @access  Public

const getAttendance = async (req, res) => {
  try {
    const { data } = await axios({
      url: process.env.ERP_ATTENDANCE,
      method: "POST",
      headers: {
        token: req.headers.token,
      },
    });
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      attendence: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Server Error, Please try again later.",
    });
  }
};

export { getAttendance };
