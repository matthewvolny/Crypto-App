import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./loginAndSignUp.css";

export default function LoginAndSignUp() {
  const [typeOfForm, setTypeOfForm] = useState("signup");

  return (
    <div>
      <div className="login-buttons-container">
        <div
          className="button"
          onClick={() => {
            setTypeOfForm("login");
          }}
        >
          Log in
        </div>
        <div
          className="button"
          onClick={() => {
            setTypeOfForm("signup");
          }}
        >
          Sign up
        </div>
      </div>
      <LoginForm typeOfForm={typeOfForm} setTypeOfForm={setTypeOfForm} />
    </div>
  );
}
