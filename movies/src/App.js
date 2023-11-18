import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Search from "./components/Search";

function App() {
  const apikey = process.env.REACT_APP_API_KEY;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home apiKey={apikey} />}></Route>
          <Route
            path="/details/:id"
            element={<Movie apiKey={apikey} />}
          ></Route>
          <Route
            path="/search/:query"
            element={<Search apiKey={apikey} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
