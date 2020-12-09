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
      this.setState({ user: res})
    } catch (error) {
      console.log(error);
    }
  };

  DeleteAnime = () =>{
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URI}/profile/${params.id}/delete)`)
      .then(() => {
        this.props.history.push("/profile/:id")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount(){
      this.getProfile();
  }

  render() {
    return (
      <div>
        <h2>Welcome {this.state.user.username}</h2>
        <img src={this.state.user.image} alt="profile"/>
        <Link to="/profile/:id/edit">Edit your Profile</Link>
        <section>
          <p>Your Anime List</p> 
          <div>
          {this.state.myAnime ? this.state.myAnime.map((data, index) => {
            return(
                <div>
                    <img src={data.image} alt="anime cover"/>
                    <h4>{data.title}</h4>
                    <button onClick={() => this.DeleteAnime()}>Remove from List</button>
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