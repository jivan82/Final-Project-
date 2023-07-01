import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Admin/Dashboard";
import GetAllUsers from "./Admin/GetAllUsers";
import GetAllDoctors from "./Admin/GetAllDoctors";
import ApplyDoctor from "./Doctor/ApplyDoctor";
import Profile from "./Pages/Profile";
import FindDoctor from "./Doctor/FindDoctor";
import Appointment from "./Doctor/Appointment";
import GetAllAppointments from "./Admin/GetAllAppointments";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PatientProfile from "./Doctor/PatientProfile";
import Blood from "./Pages/Blood";
import GetAllDonors from "./Admin/GetAllDonors";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Pages */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blood" element={<Blood />} />

            {/* Doctor */}
            <Route path="/doctor/apply" element={<ApplyDoctor />} />
            <Route path="/doctor/find" element={<FindDoctor />} />
            <Route path="/doctor/appointment/:id" element={<Appointment />} />
            <Route path="/doctor/patient/:id" element={<PatientProfile />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/get-all-users" element={<GetAllUsers />} />
            <Route path="/admin/get-all-doctors" element={<GetAllDoctors />} />
            <Route path="/admin/get-all-donors" element={<GetAllDonors />} />
            <Route
              path="/admin/get-all-appointments"
              element={<GetAllAppointments />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
