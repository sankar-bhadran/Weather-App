import prisma from "../DB/db.config.js";
import { compareSync, hashSync } from "bcrypt";
import { generateToken } from "../jwtUtils/jwtToken.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.status(400).json({
        message: "Email Already Taken. Please try another email",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashSync(password, 10),
      },
    });

    return res.status(200).json({
      data: newUser,
      message: "Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    if (!compareSync(password, user.password)) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY_REFRESH,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("accessToken", accessToken, { maxAge: 60 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      login: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
};

export const Dashboard = async (req, res) => {
  return res.json({ valid: true, message: "authorized" });
};

export const logOut = async (req, res) => {
  const { id } = req.body; // Only need the ID to find the user

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({ message: "Logout Successfully" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in logout" });
  }
};
