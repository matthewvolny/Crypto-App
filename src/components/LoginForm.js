import React from "react";
import "./loginForm.css";

export default function LoginForm({ typeOfForm, setTypeOfForm }) {
  return (
    <div className="form">
      <form>
        {typeOfForm === "login" ? (
          <div>
            <div className="heading">Login</div>
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
          Password should contain both letter and number, with minimum length of
          8 characters
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
  );
}
