const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    hospital:{
      type: String,
      required: true,
  
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerConsultation: {
      type: Number,
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
