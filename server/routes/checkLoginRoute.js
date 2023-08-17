import express from "express";
import jwt from "jsonwebtoken";
import User from "../mongodb/models/user.js";

const router = express.Router();

router.route("/checklogin").post(async (req, res) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("error");
    throw new Error("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, "jwtSecret");
    // attach the user to the job routes
    // req.user = { userId: payload.userId, name: payload.name };
    const user = await User.findOne({ _id: payload.userId });
    if (user) {
      res.status(200).json({ success: true, message: user });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    throw new Error("Authentication invalid");
  }
});



// Route for getting the user details for the user profile page
router.route("/getUserDetails").post(async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name: name });
    if (user) {
      res.status(200).json({ success: true, message: user });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});



// Route for updating the user profile
router.route("/updateProfile").post(async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name: name });
    if (user) {
      res.status(200).json({ success: true, message: user });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
