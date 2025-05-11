import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").at(1);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized attempt" });
    }

    const decoded = jwt.verify(token, "secretKeyoF123123");
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Wrong token" });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not recognized" });
    }

    const newUser = { firstName: user.firstName, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default middleWare;
