import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar";
import { API, token } from "../network";
import { useEffect } from "react";
import { useState } from "react";

const GetAllUsers = () => {
  const [user, setUser] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update Admin Role
  const handleUpdateRole = async (id, isAdmin) => {
    try {
      const res = await axios.put(
        `${API}/api/admin/change-admin-role/${id}`,
        {
          isAdmin: !isAdmin ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        getUsers();
      }
    } catch (err) {
      console.log(err);
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
          List of all Users
        </h2>
        <div className="table-responsive py-3">
          <table className="table table-striped table-hover">
            <thead className="table-warning">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isDoctor && "Doctor"}
                    {user.isAdmin && "Admin"}
                    {!user.isDoctor && !user.isAdmin && "User"}
                  </td>
                  <td style={{ gap: "8px" }} className="d-flex ">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        alert("Update Admin Role");
                        handleUpdateRole(user._id, user.isAdmin);
                      }}
                    >
                      Update Admin Role
                    </button>
                    {/* <button className="btn btn-sm btn-danger">Delete</button> */}
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

export default GetAllUsers;
