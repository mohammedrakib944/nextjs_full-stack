"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    console.log(name, email, password);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 && router.push("/dashboard/login?success=true");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="max-w-[400px] mx-auto">
      <h1>Create account</h1>
      <form
        action=""
        className="flex flex-col gap-2 mt-5"
        onSubmit={handleSubmit}
      >
        <p>Name</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="input"
        />
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
          Register
        </button>
      </form>
      <Link href="/dashboard/login">
        <button className="btn mt-4 bg-gray-600">Login</button>
      </Link>
    </div>
  );
};

export default Register;
