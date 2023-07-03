"use client";
import { useState } from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <div>
      <button
        className="bg-blue-500 py-1 px-2 text-white text-sm rounded"
        onClick={toggle}
      >
        {mode}
      </button>
    </div>
  );
};

export default ThemeToggle;
