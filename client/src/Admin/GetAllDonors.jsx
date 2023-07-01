import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar";
import { API, token } from "../network";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const GetAllDonors = () => {
  const [donors, setDonors] = useState([]);
  const getdonorss = async () => {
    axios
      .get(`${API}/api/admin/blood`)
      .then((res) => {
        if (res.data.success) {
          setDonors(res.data.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  // Delete an donors

  const deletedonors = async (id) => {
    try {
      const res = await axios.delete(`${API}/api/admin/delete-blood/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        getdonorss();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdonorss();
  }, []);
  return (
    <div className="admin-container">
      <Sidebar />
      <section className="admin-content">
        <h2 className="fw-bolder text-center text-primary">
          List of all Blood Donors
        </h2>
        <div className="table-responsive py-3">
          <table className="table table-striped table-hover">
            <thead className="table-warning">
              <tr>
                <th scope="col">Donor Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Booked Date</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donors) => (
                <tr key={donors._id}>
                  <td>{donors?.name}</td>
                  <td>{donors?.email}</td>
                  <td>{donors?.phone}</td>
                  <td>{donors?.bloodGroup}</td>

                  <td>{moment(donors?.createdAt).format("dd:mm:yy")}</td>

                  <td style={{ gap: "8px" }} className="d-flex ">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        alert("Are you sure you want to delete this?");
                        deletedonors(donors._id);
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

export default GetAllDonors;
