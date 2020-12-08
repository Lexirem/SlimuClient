import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import service from '../lib/auth-service';


class Profile extends Component {
  state = {
    userId: this.props.user._id,
    user: {}, 
  };
  getProfile = async () => {
    try{
      const res = await service.profile(this.props.match.params.id);
      this.setState({ user: res, myAnime: getAnime.data })
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount(){
      this.getProfile();
  }

  render() {
    return (
      <div>
        <p>Welcome {this.state.user.username}</p>
        <img src={this.state.user.image} alt="profile"/>
        <Link path="/:id/edit">Edit your Profile</Link>
        <section>
          <p>You Anime List</p> 
          <div>
          {this.state.myAnime ? this.state.myAnime.map((data, index) => {
            return(
                <div>
                    <img src={data.image} alt="anime cover"/>
                    <h4>{data.title}</h4>
                    <button>Remove from List</button>
                </div>    
            )
          }) : null}
          </div> 
        </section>
      </div>
    )
  }
}

export default withAuth(Profile);