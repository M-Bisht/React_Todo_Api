import jwt from "jsonwebtoken";

export const cookie = (user, res, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
