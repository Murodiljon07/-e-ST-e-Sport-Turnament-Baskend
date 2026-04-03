import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id }, // payload
    process.env.JWT_SECRET, // secret
    {
      expiresIn: "7d", // token muddati
    },
  );
};

export default generateToken;
