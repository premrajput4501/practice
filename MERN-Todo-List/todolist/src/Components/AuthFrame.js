import React from "react";

export default function AuthFrame({ children }) {
  return (
    <div className="flex justify-content items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col justify-center bg-white p-4 m-2 shadow-lg"
      >
        {children}
      </form>
    </div>
  );
}
