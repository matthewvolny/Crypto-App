import React, { useEffect, useRef } from "react";
import closeIcon from "../images/close-icon.png";
import "./loginForm.css";

export default function LoginForm({
  typeOfForm,
  setTypeOfForm,
  formVisible,
  setFormVisible,
}) {
  const isMounted = useRef(false);

  const hideLoginForm = () => {
    const loginContainer = document.querySelector(".login-container");
    loginContainer.removeAttribute("login-container-visible");
    loginContainer.setAttribute("id", "hidden");
    const backgroundMask = document.querySelector(".background-mask");
    backgroundMask.removeAttribute("visible");
    backgroundMask.setAttribute("id", "hidden");
  };

  useEffect(() => {
    if (isMounted.current) {
      const loginContainer = document.querySelector(".login-container");
      loginContainer.setAttribute("id", "login-container-visible");
      const backgroundMask = document.querySelector(".background-mask");
      backgroundMask.setAttribute("id", "visible");
      setFormVisible(false);
    } else {
      isMounted.current = true;
    }
  }, [formVisible]);

  return (
    <div className="background-mask">
      <div className="login-container">
        <form>
          {typeOfForm === "login" ? (
            <div>
              <div className="heading">Login</div>
              <img
                onClick={hideLoginForm}
                className="close-button"
                alt="close-button"
                src={closeIcon}
              />
              <div>
                New to Cryptic?
                <span
                  className="link"
                  onClick={() => {
                    setTypeOfForm("signup");
                  }}
                >
                  Create an account
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="heading">Create an account</div>
              <img
                onClick={hideLoginForm}
                alt="close-button"
                className="close-button"
                src={closeIcon}
              />
              <div>
                Gain access to additional features such as a personal Watchlist
                and Portfolio tracking.
              </div>
              <div>
                Already have an account?
                <span
                  className="link"
                  onClick={() => {
                    setTypeOfForm("login");
                  }}
                >
                  Sign in
                </span>
              </div>
            </div>
          )}
          <div>Email Address</div>
          <input type="email" placeholder="Enter your email address..." />
          <div>Password</div>
          <input type="password" placeholder="Enter your password..." />
          <div>
            Password should contain both letter and number, with minimum length
            of 8 characters
          </div>
          {typeOfForm === "login" ? (
            <div className="button">Log In</div>
          ) : (
            <>
              <div className="button">Sign Up</div>
              <div>
                By proceeding, you agree to Cryptic's Terms of Use and Privacy
                Policy.
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
