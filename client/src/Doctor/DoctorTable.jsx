import axios from "axios";
import React, { useState } from "react";
import { API, token } from "../network";
import moment from "moment";
import { Link } from "react-router-dom";

const DoctorTable = ({ appointmentsFromUser }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const changeAppointmentStatus = (appointment, status) => {
    axios
      .post(
        `${API}/api/appointment/change-appointment-status`,
        { appointmentId: appointment._id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSuccess(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="table-responsive">
      {success && (
        <div className=" text-center alert alert-success">
          {success}
          <p>Please Reload to see Changes</p>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsFromUser &&
            appointmentsFromUser.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  <Link to={`/doctor/patient/${appointment?.userId}`}>
                    {appointment?.userInfo.name}
                  </Link>
                </td>
                <td>{appointment?.doctorInfo.phoneNumber}</td>
                <td>{appointment?.date.substring(0, 10)}</td>
                <td>{moment(appointment?.time).format("hh:mm A")}</td>
                <td>{appointment?.status}</td>
                <td>
                  {appointment.status === "pending" && (
                    <div className="d-flex">
                      <button
                        className="btn btn-sm  btn-success"
                        onClick={() =>
                          changeAppointmentStatus(appointment, "approved")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2 "
                        onClick={() =>
                          changeAppointmentStatus(appointment, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
