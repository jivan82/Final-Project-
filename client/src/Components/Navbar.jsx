import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { ContextUser } from "../Context/UserContext";
import "./index.css";

const Navbar = () => {
  const user = useContext(ContextUser);
  var userInfo = user;
  const logout = () => {
    localStorage.removeItem("userInfo");
    setInterval(() => {
      window.location.href = "/login";
    }, 500);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light d-flex">
        <div className="container-fluid py-auto ml-auto px-4">
          <NavLink to="/" className=" navbar-brand main-logo">
            <img
              src="/images/doctor.jpg"
              alt=""
              className="img img-fluid"
              style={{ height: "50px" }}
            />
            <span> Find Your Doctor</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="hamburger">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav navbar-wrapper mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/doctor/find">
                  Find Doctors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/blood">
                  Blood
                </NavLink>
              </li>
              {userInfo ? (
                <li className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    role="button"
                  >
                    {userInfo.name}
                  </Link>
                  <ul
                    className="dropdown-menu profile-drop dropdown-content dropdown-menu-light"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="nav-item">
                      <NavLink
                        className="text-dark fs-6 fw-bold dropdown-item"
                        to="/profile"
                      >
                        Profile
                      </NavLink>
                    </li>
                    {userInfo.isAdmin && (
                      <li className="nav-item">
                        <NavLink
                          className="text-dark  fs-6 fw-bold dropdown-item"
                          to="/admin/dashboard"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <button
                        className="text-danger fs-6 fw-bold dropdown-item"
                        onClick={logout}
                      >
                        Signout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link login-button text-light "
                    to="/login"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
