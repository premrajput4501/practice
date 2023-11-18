import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Style from "./css/Home.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchForm from "./SearchForm";

export default function Home(props) {
  const [type, setType] = useState("movies");
  const [rating, setRating] = useState("u");
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  var imageURL = "https://image.tmdb.org/t/p/w500";

  const getPopular = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${
          type === "series" ? "tv" : "movie"
        }?api_key=${
          props.apiKey
        }&sort_by=popularity.desc&page=${page}&include_adult=${
          rating === "all" || rating === "a" ? true : false
        }`
      );
      const data = await response.json();

      setInfo(info.concat(data.results));

      setTotalResults(parseInt(data.total_pages) * data.results.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = `Cinemania - ${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;

    setPage(1);
    setInfo([]);
    setRating((prev) => prev);
    setType((prev) => prev);

    getPopular();
  }, [type, rating]);

  if (!loading) {
    return (
      <>
        <Navbar
          type={type}
          rating={rating}
          setType={setType}
          setRating={setRating}
        />
        <div className="container">
          <div className="sub-header">
            <div>
              <h1>Popular {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
              <h5>{rating.charAt(0).toUpperCase() + rating.slice(1)} Rated</h5>
            </div>
            <SearchForm />
          </div>
          <InfiniteScroll
            dataLength={info.length}
            next={() => {
              setPage((prev) => prev + 1);
              getPopular();
            }}
            hasMore={info.length < totalResults}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="content">
              {info.map((Element) => {
                return (
                  <>
                    <div key={Element.id}>
                      <div class="card" style={{ width: "15rem" }}>
                        <img
                          src={imageURL + Element.poster_path}
                          class="card-img-top"
                        />
                        <div class="card-body">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <h5 class="card-title">{Element.original_title}</h5>
                            <h6>{Element.vote_average}/10</h6>
                          </div>
                          <p class="card-text">
                            {Element.overview.length <= 150
                              ? Element.overview
                              : Element.overview.slice(0, 150) + "..."}
                          </p>
                          <Link
                            to={`/details/${Element.id}`}
                            class="btn btn-primary"
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar
          type={type}
          rating={rating}
          setType={setType}
          setRating={setRating}
        />
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
}

// console.log(
//   Element.genre_ids +
//     "\n" +
//     Element.original_language +
//     "\n" +
//     Element.original_title +
//     "\n" +
//     Element.overview +
//     "\n" +
//     Element.popularity +
//     "\n" +
//     Element.poster_path +
//     "\n" +
//     Element.release_date +
//     "\n" +
//     Element.vote_average
// );
