import React from "react";
import "../styles/dashboard.css";
import logo1 from "../assets/coding.png";
import logo2 from "../assets/code.png";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="items d-flex justify-content-center">
        <Link to="/manage">
          <img src={logo1} alt="Manage Invoices" />
        </Link>
        <Link to="/">
          <img src={logo2} alt="Manage Invoices" />
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
