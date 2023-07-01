import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, token } from "../network";

const PatientProfile = () => {
  const [patient, setPatient] = useState({});
  const params = useParams();
  const { id } = params;
  const getPatient = () => {
    axios
      .get(`${API}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) setPatient(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPatient();
  }, []);
  return (
    <div className=" d-flex flex-column align-items-center justify-content-center py-4 align-item-center">
      <h2 className="fw-bolder" style={{ color: "orange" }}>
        Patient Information
      </h2>
      <div className="patient-info d-flex align-items-center justify-content-center px-1 flex-column">
        <img
          src={
            patient?.image && patient.image.slice(0, 4) !== "http"
              ? `${API}/uploads/${patient?.image}`
              : patient?.image
          }
          alt={patient?.name}
          className="img-fluid"
          style={{ maxWidth: "40vw", maxHeight: "40vh", borderRadius: "8px" }}
        />
        <div
          className="sub-info d-flex flex-column align-items-start p-4"
          style={{
            backgroundColor: "#e5effb",
            minWidth: "30vw",
            minHeight: "30vh",
            borderRadius: "12px",
          }}
        >
          <h3 className="fw-bolder text-dark align-self-center">
            {patient?.name}
          </h3>
          <h5>
            <span className="fw-bolder text-primary">Email:</span>{" "}
            {patient?.email}
          </h5>
          <h5>
            <span className="fw-bolder text-primary">Age:</span> {patient?.age}
          </h5>
          <h5>
            <span className="fw-bolder text-primary">Sex:</span> {patient?.sex}
          </h5>
          <h5>
            <span className="fw-bolder text-primary">Gender:</span>{" "}
            {patient?.sex}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
