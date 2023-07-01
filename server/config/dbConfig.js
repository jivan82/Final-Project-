const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://rajesh:rajesh@mycluster.0avymev.mongodb.net/findMyDoctor`);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;
