import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../Context/UserContext";
import "./index.scss";

const Home = () => {
  const navigate = useNavigate();
  const user = useContext(ContextUser);

  return (
    <div className="home d-flex">
      <section className="slogan">
        <h2 className="slogan-title">
          Find <span className="best">Best Clinic</span> <br />
          To Get Solutions.
        </h2>
        <p className="slogan-description">
          Health is one of the most important things for us therefore <br />
          immediately check your health for your well-being.
        </p>{" "}
        <div className="appoint-btns d-flex ">
          <button
            className="appointment-btn"
            onClick={() => navigate("/doctor/find")}
          >
            Find Doctors
          </button>
          {user && !user.isDoctor ? (
            <button
              className="appointment-btn"
              disabled={user && user.isDoctor === true}
              onClick={() => {
                navigate("/doctor/apply");
              }}
            >
              Apply as a Doctor
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="doctor-img">
        <img src="/images/doctor.png" alt="doctor" />
      </section>
    </div>
  );
};

export default Home;
