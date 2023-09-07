import jwt from "jsonwebtoken";

export const cookie = (user, res, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
