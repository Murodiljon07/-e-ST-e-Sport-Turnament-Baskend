import User from "../models/User.js";

export const banUser = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    if (admin.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can ban" });
    }

    const user = await User.findById(req.body.userId);

    user.ban = {
      reason: req.body.reason,
      until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    await user.save();

    res.json({ msg: "User banned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
