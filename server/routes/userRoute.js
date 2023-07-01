const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Blood = require("../models/bloodModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
const upload = require("../config/fileUpload");

// Register User
router.post("/", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "Login successful",
        success: true,
        data: {
          token,
          id: user._id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});
// Get User Info
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

// Apply for doctor account
router.post("/apply-doctor-account", isAuthenticated, async (req, res) => {
  try {
    const doctorExists = await Doctor.findOne({ userId: req.body.userId });
    if (!doctorExists) {
      const newdoctor = new Doctor({ ...req.body, status: "pending" });
      await newdoctor.save();
      res.status(200).send({
        success: true,
        message: "Doctor account applied successfully",
      });
    }
    res.status(200).send({
      success: false,
      message: "You Have already applied for doctor account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

// Book Appointment
router.post("/book-appointment", isAuthenticated, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

// check booking availability
router.post(
  "/check-booking-availability",
  isAuthenticated,
  async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm")
        .add(1, "hours")
        .toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await Appointment.find({
        doctorId,
        date,
        time: { $gte: fromTime, $lte: toTime },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not available",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Appointments available",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking appointment",
        success: false,
        error,
      });
    }
  }
);

// Post Blood donate form
router.post("/blood", async (req, res) => {
  try {
    const blood = new Blood(req.body);
    await blood.save();
    return res.status(200).send({
      success: true,
      message: "Submitted Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: error,
    });
  }
});

router.put("/image/:id", upload.single("image"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      image: req.file.filename,
    });
    const isDoctor = await Doctor.findOne({ userId: user._id });
    if (isDoctor) {
      isDoctor.image = req.file.filename;
      await isDoctor.save();
    }

    res.status(200).json({
      message: "Uploaded Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
