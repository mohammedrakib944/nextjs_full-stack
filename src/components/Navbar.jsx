"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 3,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  return (
    <div className="flex justify-between py-4">
      <div className="font-bold text-lg">Rakib</div>
      <ThemeToggle />
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="hover:text-blue-500 hover:underline"
              href={link.url}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      {session.status === "authenticated" && (
        <button onClick={signOut}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
