import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import { API } from "../network";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { name, email, message } = contact;
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/contact`, contact);
      if (res.data.success) {
        setSuccess(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center py-4 px-2">
      {success != null && <div className="alert alert-success">{success}</div>}
      <div className="row align-items-center justify-content-center gx-0">
        <div className="col-md-10 py-4">
          <h1 className="text-primary text-center mb-3  fw-bold text-decoration-underline">
            Contact Us
          </h1>
          <p className="text-center">
            At Find Your Doctor, we are dedicated to providing you with the best
            medical care and service.
          </p>
          <p className="text-center">
            If you have any questions or concerns, please feel free to contact
            us.
          </p>

          <ul className="contact-list list-group row align-items-center gx-0">
            <li className="list-group-item col-md-10 list-group-item-secondary">
              <span className="fw-bolder">Email:</span>{" "}
              support@findyourdoctor.com
            </li>
            <li className="list-group-item col-md-10 list-group-item-info">
              <span className="fw-bolder"> Phone:</span>
              (555) 555-5555
            </li>
            <li className="list-group-item col-md-10 list-group-item-light">
              <span className="fw-bolder"> Address:</span> 123 Main St,
              Kathmandu Nepal
            </li>
            <li className="list-group-item col-md-10 list-group-item-success">
              <span className="fw-bolder">Hours of Operation:</span> Monday -
              Friday, 7am - 11pm NST
            </li>
          </ul>
        </div>
        <div className="col-md-10  py-4">
          <div className="contactform">
            <form onSubmit={handleSubmit}>
              <div className="form-group row gx-0 ">
                <label htmlFor="name">Name</label>
                <div className="col-md-10 mx-auto ">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row gx-0">
                <label htmlFor="email">Email</label>
                <div className="col-md-10 mx-auto">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>
              <div className="form-group row gx-0">
                <label htmlFor="message">Message</label>
                <div className="col-md-10 mx-auto">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row gx-0">
                <div className="col-md-10 mx-auto">
                  <button type="submit" className="btn mt-3 btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
