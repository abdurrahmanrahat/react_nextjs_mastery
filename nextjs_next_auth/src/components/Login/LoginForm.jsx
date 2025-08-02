"use client";

import { loginUser } from "@/services/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      // get form data
      const formData = new FormData(event.currentTarget);

      const response = await loginUser(formData);

      if (!!response.error) {
        console.log(response.error);
        setError(response.error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("check credentials");
    }
  }

  return (
    <>
      {error && <div className="text-xl text-red-500">{error}</div>}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
