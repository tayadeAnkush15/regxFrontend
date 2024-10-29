// BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center fixed top-1 left-1 mb-10 space-x-2 px-5 py-2  text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: "8px" }}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span style={{ fontSize: "16px", color: "#333" }}>Back</span>
    </button>
  );
};

export default BackButton;
