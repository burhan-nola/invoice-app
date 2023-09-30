import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import DigitalClock from "./DigitalClock";

function Navbar() {
  const admin = useSelector((state: any) => state.admin);
  const logout = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" id="logoNavbar" />
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <DigitalClock />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="bi bi-person-circle"></i> {admin.name}
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logout}>
                <i className="bi bi-power"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
