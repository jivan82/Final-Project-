import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-4">
      <div className="row gx-0">
        <div className="col-md-12 px-4 pb-4">
          <div className="bannerwrapper br-40">
            <div className="row align-items-center gx-0">
              <div className="col-md-6 banner-text">
                <div className="navigation-about d-flex align-items-center justify-content-center">
                  <Link to="/" className="fw-bold ">
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-secondary"
                    style={{ fontSize: "15px" }}
                  >
                    <>&nbsp; </>
                    {">"} About Us
                  </Link>
                </div>
                <div className="banner-heading mb-24">
                  <h1 className="text-primary text-center fw-bolder">
                    About FindYourDoctor
                  </h1>
                </div>
                <p className="text-secondary">
                  Find Your Doctor is a cutting-edge medical application that
                  connects patients with the best doctors in their area. We
                  understand how difficult it can be to find a doctor that meets
                  your needs, which is why we have made it our mission to make
                  the process as simple and easy as possible.
                </p>
              </div>
              <div className="banner-img  col-md-6">
                <img
                  src="https://cdn.pixabay.com/photo/2015/06/25/22/15/nurse-821858_960_720.png"
                  alt="doctor"
                  style={{
                    maxWidth: "100%",
                    objectFit: "contain",
                    maxHeight: "70vh",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-12 p-4  mt-4"
          style={{ backgroundColor: "#e5effb" }}
        >
          <div className="about-description">
            <p className="text-secondary">
              Find Your Doctor is a cutting-edge medical application that
              connects patients with the best doctors in their area. We
              understand how difficult it can be to find a doctor that meets
              your needs, which is why we have made it our mission to make the
              process as simple and easy as possible.
            </p>
            <p className="text-secondary">
              Our platform is designed to help you find the right doctor for
              your specific condition, whether it's a general practitioner, a
              specialist, or a surgeon. We have a comprehensive database of
              doctors and their specialties, as well as patient reviews and
              ratings to help you make an informed decision.
            </p>
            <p className="text-secondary">
              Our team is made up of medical professionals and experts in the
              field of healthcare technology, who are dedicated to providing you
              with the best possible service. We are constantly updating our
              database and adding new features to make sure that our users have
              the most up-to-date information at their fingertips.
            </p>
            <p className="text-secondary">
              At Find Your Doctor, we believe that everyone should have access
              to quality medical care, no matter where they live or what their
              budget is. We are committed to making healthcare more accessible,
              affordable, and convenient for everyone.
            </p>
            <p className="text-secondary">
              Thank you for choosing Find Your Doctor, and we look forward to
              helping you find the best doctor for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
