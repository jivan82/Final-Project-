const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const bloodModel = mongoose.model("bloods", bloodSchema);

module.exports = bloodModel;
