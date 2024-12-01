import User from "../models/login.js";

const adminOrMod = async (req, res, next) => {
  const { id } = req.data;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized to Access Admin Page",
    });
  }
  if (user.role !== "ADMIN" && user.role !== "MODERATOR") {
    return res.status(400).json({
      success: false,
      message: "Not Authorized to Access Admin Page",
    });
  }
  next();
};

const adminOnly = async (req, res, next) => {
  const { id } = req.data;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized to Access Admin Page",
    });
  }
  if (user.role !== "ADMIN") {
    return res.status(400).json({
      success: false,
      message: "Not Authorized to Access Admin Page",
    });
  }
  next();
};



export { adminOrMod, adminOnly };
