import React, { Component } from "react";
import NavBar from "./NavBar";

export default class About extends Component {
  constructor() {
    super();
    document.title = "About";
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <h1>About</h1>
          <br />
          <div class="container my-5">
            <h1 class="text-center">Weather App</h1>
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h2 class="card-title">Introduction</h2>
                    <p>
                      The Weather App is a simple web application that allows
                      users to check the current weather conditions for a
                      specified location. It provides real-time weather
                      information, including temperature, humidity, wind speed,
                      and weather description. This app is designed to be
                      user-friendly and informative, making it easy for users to
                      plan their day based on weather forecasts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
