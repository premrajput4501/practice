import React, { Component } from "react";
import NavBar from "./NavBar";

import "../components/css/home.css";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      weatherDetail: {},
      loading: false,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      feelsLike: 0,
      humidity: 0,
      icon: null,
      description: null,
      location: "Hyderbad",
    };

    document.title = "Home";
  }

  getWeatherData = () => {
    async function getLonLat() {
      let log = 0;
      let lat = 0;

      try {
        const response = await fetch(
          "https://api.openweathermap.org/geo/1.0/direct?q=" +
            this.state.location +
            "&appid={token}"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const respLLFinal = await response.json();
        if (respLLFinal && respLLFinal.length > 0) {
          lat = respLLFinal[0].lat;
          log = respLLFinal[0].lon;
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      return { lat, log };
    }

    getLonLat().then((data) => {
      const { lat, log } = data;

      this.setState({
        loading: true,
      });

      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        log +
        "&appid={token}&units=metric&limit=1";

      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((respFinal) => {
          let weatherData = {};

          weatherData = {
            weatherData: respFinal,
            main: respFinal.main,
          };

          this.setState({
            weatherDetail: weatherData,
            temp: weatherData.main.temp,
            temp_max: weatherData.main.temp_max,
            temp_min: weatherData.main.temp_min,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            icon: weatherData.weatherData.weather[0].icon,
            description: weatherData.weatherData.weather[0].description,
            loading: false,
          });
        });
    });
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.getWeatherData();
  }

  render() {
    var iconURL =
      "https://openweathermap.org/img/wn/" + this.state.icon + ".png";

    if (this.state.loading) {
      return (
        <>
          <NavBar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            Loading...
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <div className="main">
            <div className="container" style={styles.container}>
              <h1>{this.state.temp}&deg;C</h1>
              <span>
                <strong>Feels Like:</strong>
              </span>
              &nbsp;{this.state.feelsLike}&deg;C | <strong>Humidity</strong>:{" "}
              {this.state.humidity}%{" "}
              <h3>
                <div className="minmax">
                  <div>
                    <i className="fa fa-arrow-down"></i>
                    {this.state.temp_min}
                  </div>
                  <div>
                    <i className="fa fa-arrow-up"></i>
                    {this.state.temp_max}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  {this.state.description}&nbsp;
                  <img
                    src={iconURL}
                    alt=""
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                  />
                </div>
              </h3>
            </div>
          </div>
        </>
      );
    }
  }
}

const styles = {
  container: {
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
};
