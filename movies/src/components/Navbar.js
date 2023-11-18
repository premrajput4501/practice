import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  function toggleType() {
    props.setType((prev) => (prev === "movies" ? "series" : "movies"));
  }

  function toggleAgeRating(e) {
    props.setRating(e.target.value);
  }

  const navOptions = () => {
    return (
      <>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rating
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    value="a"
                    style={{
                      fontWeight: props.rating === "a" ? "bold" : "normal",
                    }}
                    onClick={toggleAgeRating}
                  >
                    Include A-Rated
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    value="u"
                    style={{
                      fontWeight: props.rating === "u" ? "bold" : "normal",
                    }}
                    onClick={toggleAgeRating}
                  >
                    U-Rated
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Type
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    style={{
                      fontWeight: props.type === "movies" ? "bold" : "normal",
                    }}
                    onClick={toggleType}
                  >
                    Movies
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    style={{
                      fontWeight: props.type === "series" ? "bold" : "normal",
                    }}
                    onClick={toggleType}
                  >
                    Series
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Cinemania
          </Link>
          {props.showFilter ? navOptions() : ""}
        </div>
      </nav>
    </>
  );
}

Navbar.defaultProps = {
  showFilter: true,
};
