import React, { useState } from "react";
import style from "./css/SearchForm.css";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <>
      <div id="searchForm">
        <input
          type="text"
          name=""
          id=""
          className="form-control"
          placeholder="Fast X"
          onChange={(e) => {
            setSearchPhrase(encodeURIComponent(e.target.value));
          }}
        />
        <Link
          className="btn btn-success"
          to={`/search/${encodeURIComponent(searchPhrase)}`}
        >
          Search
        </Link>
      </div>
    </>
  );
}
