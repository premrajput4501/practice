import React, { Component } from "react";
import NavBar from "./NavBar";

export default class News extends Component {
  constructor() {
    super();

    this.state = {
      title: null,
      apiKey: "621f873d86d84da9aac55602e31f0458",
      articles: [],
      loading: false,
    };
  }

  fetchNewsData = (title) => {
    this.setState({
      loading: true,
    });

    title = encodeURIComponent(title);

    const url = `https://newsapi.org/v2/everything?q=${title}&apiKey=${this.state.apiKey}&limit=1`;

    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((respFinal) => {
        this.setState({
          loading: false,
          articles: respFinal.articles,
        });
      });
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");

    this.setState(
      {
        title: title,
      },
      () => {
        this.fetchNewsData(this.state.title);
      }
    );
  }

  render() {
    var count = 0;
    if (this.state.loading) {
      <>
        <NavBar search={false} />
        <div className="container">
          <h4>Loading...</h4>
        </div>
      </>;
    } else {
      return (
        <div>
          <NavBar search={false} />
          <div className="container">
            {this.state.articles.map((element) => {
              if (count == 0) {
                return (
                  <>
                    <div
                      class="d-flex justify-content-center"
                      key={element.title}
                    >
                      <img src={element.urlToImage} style={{ width: "100%" }} />
                    </div>
                    <div className="container">
                      <div class="d-flex justify-content-center">
                        <h1>{element.title}</h1>
                      </div>
                      <p>{element.content}</p>
                      <a href={element.url}>Read Full Article</a>
                    </div>
                  </>
                );
              } else {
                return;
              }

              count += 1;
            })}
          </div>
        </div>
      );
    }
  }
}
