import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextUser } from "../Context/UserContext";
import DoctorTable from "../Doctor/DoctorTable";
import { API, ID, token } from "../network";
import Table from "./Table";

const Profile = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsFromUser, setAppointmentsFromUser] = useState([]);
  const [success, setSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const user = useContext(ContextUser);
  const getAppointmentsOfDoctor = () => {
    axios
      .post(
        `${API}/api/appointment/userId`,
        { ID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setAppointments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // get all appointments from user
  const getAppointmentsFromUser = () => {
    axios
      .get(`${API}/api/appointment/doctorID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setAppointmentsFromUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) console.log("File doesnt exist");
    if (file.size > 1024 * 1024) {
      return alert("size too large");
    }
    const formData = new FormData();
    formData.append("image", file);

    axios
      .put(`${API}/api/user/image/${ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setSuccess(res.data.message);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setUploadError(err);
      });
  };
  useEffect(() => {
    getAppointmentsOfDoctor();
    if (user && user.isDoctor) {
      getAppointmentsFromUser();
    }
  }, [user]);

  return (
    <div className="profile-page row gx-0 p-3">
      <div
        className="personal-info d-flex justify-content-around flex-column px-32 col-md-4"
        style={{ border: "1px dashed #D2CDF2" }}
      >
        <h3 style={{ color: "orange" }} className="py-3  fw-bold">
          Personal Information
        </h3>
        {success != null && (
          <div className="alert alert-success">{success}</div>
        )}
        {uploadError && (
          <div className="alert alert-success">{uploadError}</div>
        )}
        <div className="personal-info-content">
          <div className="img-container  d-flex flex-column">
            <img
              src={
                user?.image && user.image.slice(0, 4) !== "http"
                  ? `${API}/uploads/${user?.image}`
                  : user?.image
              }
              alt={user?.name}
              className="img-fluid img align-self-center"
              style={{ maxWidth: "180px", maxHeight: "180px" }}
            />

            <form
              encType="multipart/form-data"
              className="form d-flex flex-column align-items-center justify-center"
            >
              <label htmlFor="image" className="form-label btn btn-secondary">
                Change Picture
              </label>
              <input
                id="image"
                type="file"
                name="image"
                filename="image"
                onChange={uploadImage}
                placeholder="Change Picture"
                className="form-control"
                style={{ visibility: "hidden" }}
              />
            </form>
          </div>
          <div className="personal-info-content-item">
            <p className="text-primary fw-bold">Name</p>
            <p className="text-secondary">{user && user.name}</p>
          </div>
          <div className="personal-info-content-item">
            <p className="text-primary fw-bold">Email</p>
            <p className="text-secondary">{user && user.email}</p>
          </div>
          <div className="personal-info-content-item">
            <p className="text-primary fw-bold">Age</p>
            <p className="text-secondary">{user && user.age}</p>
          </div>
          <div className="personal-info-content-item">
            <p className="text-primary fw-bold">Sex</p>
            <p className="text-secondary">{user && user.sex}</p>
          </div>
          <div className="personal-info-content-item">
            <p className="text-primary fw-bold">Account Created At</p>
            <p className="text-secondary">
              {user && user.createdAt.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <section
        className="my-appointments col-md-8"
        style={{ border: "1px dashed #D2CDF2" }}
      >
        <h3 style={{ color: "orange" }} className=" py-3 text-center  fw-bold">
          My Appointments
        </h3>
        {user && user.isDoctor ? (
          <>
            <DoctorTable appointmentsFromUser={appointmentsFromUser} />
          </>
        ) : (
          <>
            <Table appointments={appointments} />
          </>
        )}
      </section>
    </div>
  );
};

export default Profile;
