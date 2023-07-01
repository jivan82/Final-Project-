import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-container">
        <div className="footer-title">
          <h3>
            <i className="fa fa-medkit"></i> FYD
          </h3>
          <p className="fyd-description">
            Find Your Doctor is a Web Application that will help patients to
            book doctor appointment and fulfil their prospects.
          </p>
          <div className="social-icons">
            <span>
              <i className="fa-brands fa-instagram"></i>
            </span>
            <span>
              <i className="fa-brands fa-twitter"> </i>
            </span>
            <span>
              <i className="fa-brands fa-facebook-f"></i>
            </span>
            <span>
              <i className="fa-brands fa-linkedin-in"> </i>
            </span>
          </div>
        </div>
        <div className="about">
          <h4>About</h4>

          <Link to="/">Company</Link>
          <Link to="/">Team</Link>
          <Link to="/">Career</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="policies d-flex flex-column">
          <h4>Policies</h4>
          <Link to="/">Terms & Conditions</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Refund Policy</Link>
          <Link to="/">Billing System</Link>
        </div>
        <div className="newsletter d-flex flex-column">
          <h4>Subscribe Our Newsletter</h4>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Email address"
          />
          <button className="btn btn-primary">Submit Now</button>
        </div>
      </section>

      <h5>© 2023 FYD. All rights reserved.</h5>
    </footer>
  );
};

export default Footer;
