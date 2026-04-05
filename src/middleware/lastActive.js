import User from "../models/User.js";

const updateLastActive = async (req, res, next) => {
  try {
    if (req.user?.id) {
      await User.findByIdAndUpdate(req.user.id, {
        "profile.lastActive": new Date(),
        isOnline: true,
      });
    }
    next();
  } catch (err) {
    next();
  }
};

export default updateLastActive;
