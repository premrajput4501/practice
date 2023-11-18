import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Weather App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.linkedin.com/in/saiuttarkar"
                    target="_blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
