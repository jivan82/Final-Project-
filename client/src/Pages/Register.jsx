import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../network";
import axios from "axios";

const Register = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    sex: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${API}/api/user`, {
      email: data.email,
      password: data.password,
      name: data.name,
      age: data.age,
      sex: data.sex,
    });
    if (res.data.success) {
      setSuccess(true);
      navigate("/login");
    } else {
      setError(res.data.message);
    }
  };
  return (
    <div className="container login-page py-5 d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-primary py-3 fw-bolder">Register</h2>
      {success && (
        <div className="alert alert-success">Registered Successfully</div>
      )}
      {error && <h5 className="text-danger">{error}</h5>}
      <div className="login-container">
        <div className="login-logo">
          <img src="/images/login.png" className="img img-fluid" alt="login" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="login-form">
          <form
            onSubmit={handleSubmit}
            className="py-3 d-flex flex-column px-5 form-container container"
          >
            <div className="firstdetails d-flex  flex-column">
              <div className="name">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Fullname"
                  className="form-control"
                  onChange={handleChange}
                  value={data.name}
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
              <div className="password  justify-self-start mt-1">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div className="age">
                <label htmlFor="age" className="form-label">
                  Age (inYears)
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="age"
                  className="form-control"
                  value={data.age}
                  onChange={handleChange}
                />
              </div>

              <div className="sex">
                <label htmlFor="sex" className="form-label">
                  Sex
                </label>
                <input
                  id="sex"
                  type="text"
                  name="sex"
                  placeholder="sex"
                  className="form-control"
                  value={data.sex}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="action-btn d-flex flex-column">
              <button className="btn btn-primary mt-3">Register</button>
            </div>
            <p className=" text-center"> Have an Account ?</p>
            <Link to="/login" className="mb-1 btn btn-primary">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
