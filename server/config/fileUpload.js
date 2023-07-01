const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// File Upload Using Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "../client/public/images/users");
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      uuidv4() + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
    storage: storage,
  });
module.exports=upload  