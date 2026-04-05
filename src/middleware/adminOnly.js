const adminOnly = (req, res, next) => {
  // ⚡ endi DB query kerak emas
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }

  next();
};

export default adminOnly;
