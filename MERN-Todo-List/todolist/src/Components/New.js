import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

import { useDispatch } from "react-redux";
import { newtodo } from "../Redux/Functions/TodoFunc";
import { setTodoAdded } from "../Redux/Slices/TodoSlice";

export default function New({ val, func }) {
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center shadow-md w-[26vw]">
      <div className="flex flex-col bg-white p-4 w-full">
        <div className="flex justify-end items-center gap-3">
          <p className="text-xl font-bold text-right text-blue-600">Edit</p>
          <MdCancel
            className="cursor-pointer"
            size={20}
            onClick={() => {
              func(!val);
            }}
          />
        </div>
        <form
          onSubmit={(e) => {
            dispatch(setTodoAdded());

            dispatch(
              newtodo({
                title: title,
                desc: desc,
                completion: date,
              })
            );
          }}
          className="flex flex-col"
        >
          <input
            type="date"
            name=""
            id=""
            className="border-none shadow-md outline-none p-3 m-2"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Title.."
            name=""
            id=""
            className="border-none shadow-md outline-none p-3 m-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <textarea
            type="text"
            placeholder="Description.."
            name=""
            id=""
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="border-none shadow-md outline-none p-3 m-2"
          />
          <button
            type="submit"
            className="p-2 m-2 border-none bg-blue-600 text-white hover:shadow-md font-semibold"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
