const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// Get APproved Doctors
router.get("/all-approved-doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({ success: true, data: doctors });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

// Get Pending Doctors
router.post(
  "/get-doctor-info-by-user-id",
  isAuthenticated,
  async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      res.status(200).send({
        success: true,
        message: "Doctor info fetched successfully",
        data: doctor,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting doctor info", success: false, error });
    }
  }
);

// Get Doctor Info By  Doctor ID
router.post("/get-doctor-info-by-id", isAuthenticated, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

// Update Doctor Profile
router.post("/update-doctor-profile", isAuthenticated, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

module.exports = router;
