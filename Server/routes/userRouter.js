import { Router } from "express";
import {
  createUser,
  Dashboard,
  LoginUser,
  logOut,
} from "../Controller/UserController.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", createUser);
router.post("/login", LoginUser);
router.post("/logout", logOut);
const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  if (!accessToken) {
    console.log(1);
    if (renewToken(req, res)) {
      console.log(2);
      next();
    }
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(3);
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        console.log(4);
        req.email = decoded.email;
        console.log(req.email);
        next();
      }
    });
  }
};

const renewToken = async (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  try {
    if (!refreshtoken) {
      return res.json({ valid: false, message: "No Refresh token" });
    } else {
      jwt.verify(
        refreshtoken,
        process.env.JWT_SECRET_KEY_REFRESH,
        (err, decoded) => {
          if (err) {
            return res.json({ valid: false, message: "Invalid Refresh Token" });
          } else {
            const accessToken = jwt.sign(
              { email: decoded.email },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1m" }
            );
            res.cookie("accessToken", accessToken, { maxAge: 60000 });
            exist = true;
          }
        }
      );
    }
    return exist;
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
};
router.get("/dashboard", verifyUser, Dashboard);

export default router;
