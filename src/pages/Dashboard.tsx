import React from "react";
import "../styles/dashboard.css";
import logo1 from "../assets/coding.png";
import logo2 from "../assets/code.png";
import { Link } from "react-router-dom";
import ImgDasboard from "../component/ImgDasboard";

const Dashboard: React.FC = () => {
  return (
    <div className="items d-flex justify-content-center">
      <Link to="/manage">
        <ImgDasboard src={logo1} />
      </Link>
      <Link to="/">
        <ImgDasboard src={logo2} />
      </Link>
    </div>
  );
};

export default Dashboard;
