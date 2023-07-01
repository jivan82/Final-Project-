const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const doctorRoute = require('./routes/doctorsRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const path = require('path');
const cors = require('cors');
const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);

  next();
};

app.use(logRequests);

app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/appointment', appointmentRoute);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server runnning at ${port}!`));
