import React, { Component } from "react";
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
    console.log(this.props.user.myAnime.name, "my list");
    console.log(this.state.anime.titles.en_jp, "anime")
    return (
      <div className="details">
        <h2>{this.state.anime.titles.en_jp}</h2>
        <h4>{this.state.anime.titles.ja_jp}</h4>
        <img src={this.state.anime.posterImage.small} alt="anime cover" />
        <p><b>Episodes:</b>{this.state.anime.episodeCount}</p>
        <p><b>Status:</b>{this.state.anime.status}</p>
        <p>{this.state.anime.description}</p>
        {this.props.user.myAnime.name !== this.state.anime.titles.en_jp ? 
        <button
          onClick={() =>
            this.addToMyList({image: this.state.anime.posterImage.small, name: this.state.anime.titles.en_jp})
          }>Add to my List
        </button> : null
        }
      </div>
    );
  }
}

export default withAuth(AnimeDetails);
