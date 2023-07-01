const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const bloodModel = require("../models/bloodModel");

// Get all doctors
router.get("/get-all-doctors", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
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

router.get("/get-all-users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
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
// Change doctor account status
router.post(
  "/change-doctor-account-status",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status,
      });

      const user = await User.findOne({ _id: doctor.userId });

      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);
// Get all appointments
router.get(
  "/get-all-appointments",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const appointments = await Appointment.find({});
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);
// Change admin role of user
router.put(
  "/change-admin-role/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const { isAdmin } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, {
        isAdmin,
      });
      res.status(200).send({
        message: "Admin Role Updated Successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error Updating Admin Role",
        success: false,
        error,
      });
    }
  }
);
// donors
// Get Donors
router.get("/blood", async (req, res) => {
  try {
    const donors = await bloodModel.find({});
    return res.status(200).send({
      success: true,
      data: donors,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      error: error,
    });
  }
});

// Delete an Appointment
router.delete(
  "/delete-blood/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      console.log(req.params.id);
      const donors = await bloodModel.findOne({ _id: req.params.id });
      if (!donors) {
        return res.status(200).send({
          message: "Appointment does not exist",
          success: false,
        });
      }
      await donors.remove();

      res.status(200).send({
        message: "Appointment deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error deleting appointment",
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
