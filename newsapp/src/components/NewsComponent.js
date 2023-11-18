import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NewsComponent extends Component {
  render() {
    return (
      <>
        <div class="card" style={{ width: "18rem" }}>
          <img src={this.props.imgURL} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{this.props.title}</h5>
            <p class="card-text">{this.props.desc}</p>
            <p
              style={{
                color: "gray",
                fontSize: "0.7rem",
              }}
            >
              {this.props.date}
            </p>
            <Link
              to={`/news?title=${this.props.title}`}
              class="btn btn-primary"
            >
              Read More
            </Link>
          </div>
        </div>
      </>
    );
  }
}
