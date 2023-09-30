import axios from "axios";
import React, { useState } from "react";
import "../styles/loader/spin01.css";
import { useDispatch } from "react-redux";
import { setHeader } from "../redux/slices/Header";
import App from "../App";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(import.meta.env.VITE_URL_ADMIN + "/admin/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(setHeader({ headers: { token: res.data.token } }));
        setLoading(false);
        setLogin(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
      });
  };

  return isLogin ? (
    <App />
  ) : (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  {/* <label htmlFor="username" className="form-label">Username:</label> */}
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="form-control text-center"
                    placeholder="Input your username here"
                    required
                  />
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="password" className="form-label">Password:</label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-control text-center"
                    placeholder="Input your password here"
                    required
                  />
                </div>
                <div
                  className="d-grid"
                  style={{ display: "flex", justifyContent: "center" }}>
                  {isLoading ? (
                    <span className="loader"></span>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-box-arrow-in-right"></i> Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
