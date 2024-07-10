export const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!accessToken) {
      if (renewToken(req, res)) {
        next();
      }
    } else {
      jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: "Invalid Token" });
        } else {
          user.id = decoded.id;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
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
              { id: decoded.id },
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
