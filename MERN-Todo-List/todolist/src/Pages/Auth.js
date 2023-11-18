import React, { useEffect, useState } from "react";
import AuthFrame from "../Components/AuthFrame";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../Redux/Functions/AuthFunc";
import Alert from "../Components/Alert";
import { MdArrowCircleRight } from "react-icons/md";
import { tokenAction } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authType, setAuthType] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, errors, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let localToken = localStorage.getItem("token");

    if (localToken) {
      dispatch(tokenAction({ payload: localToken, type: "SET" }));

      navigate("/");
    }
  });

  useEffect(() => {
    if (errors) {
      document.getElementById("alert").style.display = "block";

      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 3000);
    } else {
      document.getElementById("alert").style.display = "none";
    }
  }, [errors]);

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        {authType === "login" ? (
          <section className="login">
            <AuthFrame>
              <div id="alert" style={{ display: "none" }}>
                <Alert msg={errors} />
              </div>
              <p className="text-xl text-right m-2 font-bold text-blue-600">
                Login
              </p>
              <input
                type="text"
                placeholder="Username"
                className="shadow-md outline-none p-3 m-2 rounded-md border-gray-300 hover:border-2 hover:shadow-none transition-all ease-linear duration-100"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="shadow-md outline-none p-3 m-2 rounded-md border-gray-300 hover:border-2 hover:shadow-none transition-all ease-linear duration-100"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
              <button
                type="submit"
                className="border-none bg-blue-600 text-white p-2 m-2 font-semibold uppercase hover:shadow-md transition-shadow    ease-linear duration-100"
                onClick={() => {
                  dispatch(
                    login(
                      JSON.stringify({
                        username: username,
                        password: password,
                      })
                    )
                  );
                }}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <MdArrowCircleRight className="animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
              <p
                className="text-gray-500 text-md text-center cursor-pointer"
                onClick={() => {
                  setUsername("");
                  setPassword("");

                  setAuthType("signup");
                }}
              >
                Create an Account
              </p>
            </AuthFrame>
          </section>
        ) : (
          <section className="signup">
            <AuthFrame>
              <div id="alert" style={{ display: "none" }}>
                <Alert msg={errors} />
              </div>
              <p className="text-xl text-right m-2 font-bold text-blue-600">
                Create Account
              </p>
              <input
                type="text"
                placeholder="Username"
                className="shadow-md outline-none p-3 m-2 rounded-md border-gray-300 hover:border-2 hover:shadow-none transition-all ease-linear duration-100"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="shadow-md outline-none p-3 m-2 rounded-md border-gray-300 hover:border-2 hover:shadow-none transition-all ease-linear duration-100"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
              <button
                type="submit"
                className="border-none bg-blue-600 text-white p-2 m-2 font-semibold uppercase hover:shadow-md transition-shadow    ease-linear duration-100"
                onClick={() => {
                  dispatch(
                    signup(
                      JSON.stringify({
                        username: username,
                        password: password,
                      })
                    )
                  );
                }}
              >
                Next
              </button>
              <p
                className="text-gray-500 text-md text-center cursor-pointer"
                onClick={() => {
                  setUsername("");
                  setPassword("");

                  setAuthType("login");
                }}
              >
                {loading ? (
                  <MdArrowCircleRight className="animate-spin" />
                ) : (
                  "Next"
                )}
              </p>
            </AuthFrame>
          </section>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="fixed bottom-0 z-0"
      >
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,106.7C960,85,1056,75,1152,80C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
