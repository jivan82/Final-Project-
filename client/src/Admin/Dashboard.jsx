import React from "react";
import Sidebar from "./Sidebar";
import "./index.scss";
import { useContext } from "react";
import { ContextUser } from "../Context/UserContext";

const Dashboard = () => {
  const user = useContext(ContextUser);
  return (
    <div className="admin-container">
      <Sidebar />
      <section className="admin-content">
        <h2 className="fw-bolder text-center text-primary">
          Hello {user && user.name} !
        </h2>
        <p className="text-secondary text-center">Welcome to your dashboard</p>
        <p className="text-dark text-center">
          You can manage your users, doctors appointments and control the
          application from here
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
