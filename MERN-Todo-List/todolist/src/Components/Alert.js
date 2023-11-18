import React from "react";

import { MdWarning } from "react-icons/md";

export default function Alert({ msg }) {
  return (
    <>
      <div className="flex justify-between items-center p-2 rounded-sm animate-bounce bg-red-700 shadow-sm w-full">
        <MdWarning color="yellow" size={20} />
        <p className="text-white font-semibold">{msg}</p>
      </div>
    </>
  );
}
