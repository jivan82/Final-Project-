import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar";
import { API, token } from "../network";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const GetAllAppointments = () => {
  const [appointment, setAppointment] = useState([]);
  const getappointments = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/get-all-appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Delete an Appointment

  const deleteAppointment = async (id) => {
    try {
      const res = await axios.delete(
        `${API}/api/appointment/delete-appointment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        getappointments();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getappointments();
  }, []);
  return (
    <div className="admin-container">
      <Sidebar />
      <section className="admin-content">
        <h2 className="fw-bolder text-center text-primary">
          List of all Appointments
        </h2>
        <div className="table-responsive py-3">
          <table className="table table-striped table-hover">
            <thead className="table-warning">
              <tr>
                <th scope="col">Doctor</th>
                <th scope="col">Patient</th>
                <th scope="col">Created At</th>
                <th scope="col">Appointment Status</th>
                <th scope="col">Booked Date</th>
                <th scope="col">Booked Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    {appointment?.doctorInfo.firstName}
                    {appointment?.doctorInfo.lastName}
                  </td>
                  <td>{appointment?.userInfo.name}</td>
                  <td>{appointment?.createdAt.slice(0, 10)}</td>
                  <td>{appointment?.status} by doctor</td>
                  <td>{appointment?.date.slice(0, 10)} </td>
                  <td>{moment(appointment?.time).format("hh:mm A")}</td>

                  <td style={{ gap: "8px" }} className="d-flex ">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        alert("Are you sure you want to delete this?");
                        deleteAppointment(appointment._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default GetAllAppointments;
