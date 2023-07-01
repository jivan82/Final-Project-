import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar";
import { API, token } from "../network";
import { useEffect } from "react";
import { useState } from "react";

const GetAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [sucessMessage, setSuccessMessage] = useState(null);
  const getUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/get-all-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Update Doctor Status
  const changeDoctorStatus = async (user, status) => {
    try {
      const resposne = await axios.post(
        `${API}/api/admin/change-doctor-account-status`,
        { doctorId: user._id, userId: user.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resposne.data.success) {
        setSuccessMessage(resposne.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="admin-container">
      <Sidebar />
      <section className="admin-content">
        <h2 className="fw-bolder text-center text-primary">
          List of all Doctors
        </h2>
        {sucessMessage !== null && (
          <div className="text-center alert alert-success">
            {sucessMessage} <p>Reload to see Changes</p>
          </div>
        )}
        <div className="table-responsive py-3">
          <table className="table table-striped table-hover">
            <thead className="table-warning">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Created At</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user && user.createdAt.substring(0, 10)}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.status === "pending" || user.status === "blocked" ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => changeDoctorStatus(user, "approved")}
                      >
                        Approve
                      </button>
                    ) : (
                      <></>
                    )}
                    {user.status === "approved" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => changeDoctorStatus(user, "blocked")}
                      >
                        Block
                      </button>
                    )}
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

export default GetAllDoctors;
