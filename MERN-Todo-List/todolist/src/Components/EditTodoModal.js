import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { updateTodo } from "../Redux/Functions/TodoFunc";
import { useDispatch } from "react-redux";

export default function EditTodoModal({ val, func, title, desc, date, id }) {
  const dispatch = useDispatch();

  const [newDate, setNewDate] = useState(date);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);

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
          onSubmit={() => {
            dispatch(
              updateTodo({
                type: "FIELDS",
                id: id,
                title: newTitle,
                desc: newDesc,
                date: newDate,
              })
            );
          }}
          className="flex flex-col"
        >
          <input
            type="date"
            name=""
            id=""
            value={newDate}
            onChange={(e) => {
              setNewDate(e.target.value);
            }}
            className="border-none shadow-md outline-none p-3 m-2"
          />
          <input
            type="text"
            placeholder="New Title.."
            name=""
            id=""
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            className="border-none shadow-md outline-none p-3 m-2"
          />
          <textarea
            type="text"
            placeholder="New Description.."
            name=""
            id=""
            value={newDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
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
