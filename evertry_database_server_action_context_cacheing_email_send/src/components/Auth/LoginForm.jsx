"use client";

import { loginUser } from "@/services/actions";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      await loginUser(formData);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <div className="my-2 text-red-500">{error}</div>

      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
