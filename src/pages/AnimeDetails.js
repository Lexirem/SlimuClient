import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class AnimeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: this.props.location.state.anime,
    };
  }

  addToMyList = async (props) => {
    let { image, name }= props;
    await axios.post(`http://localhost:4000/profile/favorites/${this.props.user._id}`, {image, name})
    console.log(image, name);
  };

  render() {
    console.log(this.props.location.state.anime);
    return (
      <div>
        <img src={this.state.anime.posterImage.small} alt="anime cover" />
        <h4>{this.state.anime.titles.en_jp}</h4>
        <h4>{this.state.anime.titles.ja_jp}</h4>
        <p><b>Episodes:</b>{this.state.anime.episodeCount}</p>
        <p><b>Status:</b>{this.state.anime.status}</p>
        <p>{this.state.anime.description}</p>

        <button
          onClick={() =>
            this.addToMyList({image: this.state.anime.posterImage.small, name: this.state.anime.titles.en_jp})
          }>Add to my List
        </button>
      </div>
    );
  }
}

export default withAuth(AnimeDetails);
