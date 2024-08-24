import React, { useState } from "react";
import "./index.css";
import heroImage from "../../assets/signin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// No props or additional types are needed for this component
const SignIn: React.FC = () => {
  // State to toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img
          src={heroImage}
          alt="Office Illustration"
          className="office-illustration"
        />
      </div>
      <div className="signin-right">
        <h2 className="signin-subtitle">
          Fill what we know <span>!</span>
        </h2>
        <form className="signin-form">
          <input type="email" placeholder="Email" className="signin-input" />
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="signin-input"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <button className="signin-btn">Sign In</button>
          <button className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
