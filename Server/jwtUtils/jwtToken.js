import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  console.log(payload);
  const secretKey = "hello";
  const options = {
    expiresIn: "8h",
  };
  const token = jwt.sign(payload, secretKey, options);
  console.log(token);
  return token;
};
