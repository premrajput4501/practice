import React, { useState, useEffect } from "react";
import Todo from "../Components/Todo";
import New from "../Components/New";
import { MdLogout, MdPlusOne } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokenAction } from "../Redux/Slices/UserSlice";
import { getTodos } from "../Redux/Functions/TodoFunc";

export default function Home() {
  const arr = [
    {
      date: "16 Dec",
      title: "Home work",
      desc: "Well do your hw",
      id: 1,
      added: "12-12-2023",
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  const { token } = useSelector((state) => state.user);
  const { todos, loading, errors } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useState(() => {
    dispatch(getTodos());
  });

  useEffect(() => {
    let localToken = localStorage.getItem("token");

    if (!localToken && !token) {
      navigate("/auth");
    } else {
      dispatch(tokenAction({ payload: localToken, type: "SET" }));

      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className={`${
            openModal ? "blur-sm" : "blur-none"
          } flex flex-col justify-center items-center z-0 w-full `}
        >
          <div className="rounded-xl shadow-sm bg-gradient-to-tr from-[#49a09d] to-blue-600 flex flex-col justify-end items-end p-10 m-2 w-3/12">
            <p className="text-white font-bold text-xl right-0">Todo List</p>
            <p className="text-white font-semibold text-sm right-0">
              Perfection is only a list away.
            </p>
            <div className="flex gap-4">
              <button
                className="border-none text-white text-sm flex underline"
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                Add New +
              </button>
              <span className="text-white">|</span>
              <button
                className=" border-none text-red-700 text-sm flex underline items-center"
                onClick={async () => {
                  console.log("hi");

                  localStorage.removeItem("token");
                  await dispatch(tokenAction(null));

                  navigate("/auth");
                }}
              >
                <MdLogout size={20} />
              </button>
            </div>
          </div>
          {/** */}
          {todos.map((e) => {
            var date = new Date(e.completionDate);
            var completionDate =
              date.toString().split(" ")[2] +
              " " +
              date.toString().split(" ")[1];

            return (
              <Todo
                key={e.id}
                date={completionDate}
                raw={e.completionDate.split("T")[0]}
                title={e.todoTitle}
                desc={e.todoDesc}
                completed={e.completed}
                id={e._id}
                added={e.added.toString().split("T")[0]}
              />
            );
          })}
        </div>
        <div className={`${openModal ? "absolute " : "hidden"}`}>
          <New val={openModal} func={setOpenModal} />
        </div>
      </div>
    </>
  );
}
