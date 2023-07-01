import axios from "axios";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../network";
import "./index.scss";

const FindDoctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getDoctors = () => {
    axios
      .get(`${API}/api/doctor/all-approved-doctors`)
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getDoctors(), []);

  // function to get filtere list
  function getFilteredList() {
    // Avoid filtering if no category is selected
    if (!selectedCategory) {
      return doctors;
    }
    return doctors.filter(
      (doctor) =>
        doctor.specialization.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [doctors, selectedCategory]);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleNavigation = ({ doctor }) => {
    navigate(`/login?redirect=/doctor/appointment/${doctor._id}`);
  };
  return (
    <div className="container find-doctor py-4">
      <h4 className="text-primary text-center">Professional Team</h4>
      <h3 className="text-center fw-bold">Our Experience Doctors</h3>
      <div className="category pt-3">
        <h5 className="fw-bold">Filter By Specialty</h5>
        <div
          className="category-container"
          style={{ maxWidth: "30vh", zIndex: "999" }}
        >
          <select
            name="category-list"
            id="category-list"
            className="form-select"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {doctors.map((doctor, index) => (
              <option value={doctor.specialization} key={index}>
                {doctor.specialization}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="doctors-grid">
        {filteredList.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <div className="overlay">
              <img
                className="img img-fluid doctor-img"
                src={
                  doctor?.image && doctor.image.slice(0, 4) !== "http"
                    ? `${API}/uploads/${doctor?.image}`
                    : doctor?.image
                }
                alt={doctor?.name}
              />
              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigation({ doctor })}
                >
                  Appointment
                </button>
              </div>
              <div className="doctor-info">
                <h4 className="fw-bolder">
                  {doctor?.firstName} {doctor?.lastName}
                </h4>
                <div className="sub-info d-flex justify-content-between align-items-center">
                  <p className="text-primary specialization  fw-bolder">
                    {doctor?.specialization}
                  </p>
                  <p className="text-success fw-bold">
                    Rs. {doctor?.feePerConsultation}
                  </p>
                </div>
                <p
                  style={{ padding: "0", margin: "0", fontSize: "15px" }}
                  className="text-secondary fw-bold"
                >
                  {doctor?.hospital}
                </p>
                <p className="text-secondary fw-bolder">
                  {doctor?.address}, Nepal
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctor;
