import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { useParams } from "react-router-dom";

export default function Movie(props) {
  const { id } = useParams();

  const [info, setInfo] = useState([]);

  var imageURL = "https://image.tmdb.org/t/p/w500";

  const getMovie = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${props.apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setInfo(response);
      });
  };

  function GetGenres() {
    if (info.genres) {
      const genreNames = info.genres.map((genre) => genre.name);

      return genreNames.join(", ");
    } else {
      return null;
    }
  }

  function GetProductionCompanies() {
    if (info.genres) {
      const production_companies = info.production_companies.map(
        (production_company) => production_company.name
      );
      return production_companies.join(", ");
    } else {
      return null;
    }
  }

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <>
      <Navbar showFilter={false} />
      <div className="container">
        <div
          className="sec-1"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
            alt=""
            style={{
              width: "20%",
            }}
          />
          <div
            style={{
              marginLeft: "10px",
            }}
          >
            <h1>{info.original_title}</h1>
            <h3>{info.title}</h3>
            <h5>{info.tagline}</h5>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              {info.production_companies
                ? info.production_companies.forEach((element) => {
                    return <p>{element}</p>;
                  })
                : ""}
              Language: <b>{info.original_language}</b>
              <br />
              Released On: <b>{info.release_date}</b>
              <br />
              Genre: <br />
              {GetGenres()}
            </div>
          </div>
        </div>
        <p
          style={{
            marginTop: "20px",
          }}
        >
          {info.overview}
        </p>
        <br />
        <p>Budget: {info.budget == 0 ? "N/A" : info.budget}</p>
        <br />
        Production Companies: {GetProductionCompanies()}
      </div>
    </>
  );
}
