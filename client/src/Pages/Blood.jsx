import { useEffect, useState } from "react";
import { API } from "../network";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Blood = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${API}/api/user/blood`, {
      email: data.email,
      name: data.name,
      phone: data.phone,
      bloodGroup: data.bloodGroup,
    });
    if (res.data.success) {
      setSuccess(true);
      console.log(res.data);
    } else {
      setError(res.data.message);
    }
  };
  return (
    <div className="login-page py-5 container d-flex flex-column align-items-center justify-content-center">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Form Submitted</div>}
      <h2 className="text-primary py-2 fw-bolder">Blood</h2>
      <div className="login-container ">
        <div
          className="login-logo d-flex flex-column container"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <h3 className="fw-bolder py-2 text-primary">
            Donate Blood, Save Life
          </h3>
          <h3 className="fw-bolder text">Donate Blood, Feel Better</h3>
          <img
            src="/images/blood.png"
            className="img img-fluid blood-img"
            alt="login"
          />
        </div>

        <div className="login-form align-items-center">
          <form
            onSubmit={handleSubmit}
            className="py-3 d-flex flex-column form-container align-items-center"
          >
            <div className="name">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="name"
                name="name"
                placeholder="name"
                className="form-control"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className="phone">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                type="phone"
                name="phone"
                placeholder="phone"
                className="form-control"
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="blood">
              <label htmlFor="blood" className="form-label">
                Blood Group
              </label>
              <input
                id="blood"
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                className="form-control"
                value={data.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="action-btn d-flex flex-column">
              <button className="btn btn-primary mt-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blood;
