import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import SearchForm from "./SearchForm";

export default function Search(props) {
  const { query } = useParams();

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  var imageURL = "https://image.tmdb.org/t/p/w500";

  const getSearch = async () => {
    setLoading(true);
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${props.apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp.results);

        setInfo(resp.results);
        setLoading(false);
      })
      .catch((E) => {
        console.log(E);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = `Cinemania - Search - ${
      decodeURIComponent(query).charAt(0).toUpperCase() +
      decodeURIComponent(query).slice(1)
    }`;

    getSearch();
  }, [query]);

  if (!loading) {
    return (
      <>
        <Navbar showFilters={false} />
        <div className="container">
          <div className="sub-header">
            <div>
              <h1>Search results for {decodeURIComponent(query)}</h1>
            </div>
            <SearchForm />
          </div>
          <div className="content">
            {info.map((Element) => {
              return (
                <>
                  <div key={Element.id}>
                    <div class="card" style={{ width: "18rem" }}>
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
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar showFilters={false} />
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
}
