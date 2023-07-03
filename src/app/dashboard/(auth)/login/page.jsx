"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password, redirect: false });
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-2 mt-5"
        onSubmit={handleSubmit}
      >
        <p>Email</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="input"
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Password "
          required
          className="input"
        />
        <button type="submit" className="btn mt-2">
          Login
        </button>
      </form>
      {/* Login with google */}
      <button className="btn" onClick={() => signIn("google")}>
        Login with google
      </button>
    </div>
  );
};

export default Login;
