import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class AnimeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { animeList: [] };
  }

  getAnimes = async () => {};

  render() {
    return (
      <div>
        {this.state.animeList
          ? this.state.animeList.map((datos) => {
              return (
                <div>
                  <img src={datos.posterImage.small} alt="anime cover"/>
                  <h4>{datos.titles.en_jp}</h4>
                  <h4>{datos.titles.ja_jp}</h4>
                  <p><b>Episodes:</b>{datos.episodeCount}</p>
                  <p><b>Status:</b>{datos.status}</p>
                  <p>{datos.description}</p>
                  
                  
                  <button>Add to my List</button>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default withAuth(AnimeDetails);
