const router = require("express").Router();
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Get My Appointments
router.post("/userId", isAuthenticated, async (req, res) => {
  const { ID } = req.body;
  try {
    const appointments = await Appointment.find({ userId: ID });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});
// Get Appointments By Doctor ID
router.get("/doctorId", isAuthenticated, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});
// Change Appointment Status
router.post("/change-appointment-status", isAuthenticated, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});
// Delete an Appointment
router.delete(
  "/delete-appointment/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      console.log(req.params.id);
      const appointment = await Appointment.findOne({ _id: req.params.id });
      if (!appointment) {
        return res.status(200).send({
          message: "Appointment does not exist",
          success: false,
        });
      }
      await appointment.remove();

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
