import React, { useState } from "react";

import { MdDelete, MdDone, MdEdit, MdThumbUp } from "react-icons/md";
import EditTodoModal from "./EditTodoModal";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { DeleteTodo, updateTodo } from "../Redux/Functions/TodoFunc";

export default function Todo({ date, title, desc, id, added, completed, raw }) {
  const [openModal, setOpenModal] = useState(false);

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div
          className={`flex flex-col rounded-xl shadow-md p-4 mb-3 w-3/12 border-t-4 border-blue-700 bg-white ${
            openModal ? "blur-sm z-0" : "blur-none"
          }`}
        >
          <p className="text-lg font-bold text-blue-700">{date}</p>
          <p className="text-md font-semibold">{title}</p>
          <span className="border-t-2 border-gray-300 mt-2 mb-2"></span>
          <p className="text-sm">{desc}</p>
          <p className="text-xs text-right text-gray-300">{added}</p>
          <div className="flex w-full">
            <form
              action={`http://localhost:3001/todos/delete/${id}`}
              className="w-full flex"
            >
              <button
                type="submit"
                className="group flex justify-center items-center border-2 border-red-700 p-2 w-full m-2 rounded-md transition-all duration-200 ease-linear hover:bg-red-700"
              >
                <MdDelete
                  className="text-red-700 group-hover:text-white"
                  size={20}
                />
              </button>
            </form>
            <form
              onSubmit={() => {
                dispatch(
                  updateTodo({
                    type: "COMPLETE",
                    id: id,
                  })
                );
              }}
              className="w-full flex"
            >
              <button className="group flex justify-center items-center border-2 border-green-600 p-2 w-full m-2 rounded-md transition-all duration-200 ease-linear hover:bg-green-600">
                {completed ? (
                  <MdThumbUp
                    className="text-green-600 group-hover:text-white"
                    size={20}
                  />
                ) : (
                  <MdDone
                    className="text-green-600 group-hover:text-white"
                    size={20}
                  />
                )}
              </button>
            </form>
            <button
              className="group flex justify-center items-center border-2 border-blue-700 p-2 w-full m-2 rounded-md transition-all duration-200 ease-linear hover:bg-blue-700"
              onClick={() => {
                setOpenModal(!openModal);
              }}
              disabled={completed ? true : false}
              style={{
                cursor: completed ? "not-allowed" : "pointer",
              }}
            >
              <MdEdit
                className="text-blue-700 group-hover:text-white"
                size={20}
              />
            </button>
          </div>
        </div>
        <div className={`${openModal ? "absolute" : "hidden"} z-10`}>
          <EditTodoModal
            val={openModal}
            func={setOpenModal}
            title={title}
            desc={desc}
            date={raw}
            id={id}
          />
        </div>
      </div>
    </>
  );
}
