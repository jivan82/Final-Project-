import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
