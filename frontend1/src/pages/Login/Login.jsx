
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@ehr.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <div className="overlay">
          <h1>🏥 EHR System</h1>
          <h2>Electronic Health Record</h2>
          <p>
            Securely manage patient records, appointments,
            prescriptions and healthcare information.
          </p>
        </div>
      </div>

      <div className="login-right">

        <div className="login-box">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;
