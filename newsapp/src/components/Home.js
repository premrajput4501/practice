import React, { Component } from "react";
import NavBar from "./NavBar";
import NewsComponent from "./NewsComponent";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      search: "politics",
      apiKey: "621f873d86d84da9aac55602e31f0458",
      page: 1,
      noOfPages: null,
      loading: false,
    };

    document.title = "Home - NewsBlink";
  }

  fetchNewsData = async () => {
    this.setState({
      loading: true,
    });

    const url = `https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=15`;

    await fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((respFinal) => {
        this.setState({
          loading: false,
          articles: respFinal.articles,
          noOfPages: Math.ceil(respFinal.totalResults / 15),
        });
      });
  };

  updateSearch = (newSearch) => {
    this.setState({ search: newSearch }, () => {
      if (newSearch.trim() === "") {
        this.setState({
          search: "oil",
        });
      } else {
        this.fetchNewsData();
      }
    });
  };

  componentDidMount() {
    this.fetchNewsData();

    if (this.state.page === 1) {
      document.getElementById("next").ariaDisabled = true;
    }
  }

  nextPage = async () => {
    this.setState({ page: parseInt(this.state.page) + 1 });

    this.fetchNewsData();

    if (this.state.noOfPages > this.state.page) {
      document.getElementById("next").ariaDisabled = true;
    }
  };

  prevPage = async () => {
    this.setState({ page: parseInt(this.state.page) - 1 });

    this.fetchNewsData();

    if (this.state.page === 1) {
      document.getElementById("next").ariaDisabled = true;
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <>
          <NavBar updateSearch={this.updateSearch} />
          <div className="container">
            <h4>Loading...</h4>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavBar updateSearch={this.updateSearch} />
          <div className="container my-3">
            <h1>NewsBlink</h1>
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.title}>
                    <NewsComponent
                      title={element.title}
                      desc={element.description}
                      imgURL={element.urlToImage}
                      url={element.url}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
            <div class="d-flex justify-content-between">
              <button
                className="btn btn-dark"
                id="prev"
                onClick={this.prevPage}
              >
                Previous
              </button>
              <button
                className="btn btn-dark"
                id="next"
                onClick={this.nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}
