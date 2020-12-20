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
      console.log(this.props.match, "res")
      this.setState({ user: res})
    } catch (error) {
      console.log(error);
    }
  };

  deleteAnime = async(_id) =>{
    try{
      await axios.put(`${process.env.REACT_APP_API_URI}/profile/favorites/${this.props.user._id}`, { _id: _id})
      this.getProfile();
    } catch(err){
      console.log(err)
    }
  };

  componentDidMount(){
      this.getProfile();
  }

  render() {
    // console.log(data.image, "data")
    return (
      <div className="profile">
        <h2>Welcome {this.state.user.username} </h2>
        <img className="foto" src={this.state.user.image} alt="profile"/>
        <Link to={`/profile/${this.props.match.params.id}/edit`}>Edit your Profile</Link>
        <section className="myList">
          <p><b>Your Anime List</b></p> 
          <div className="myAnimes">
          {this.state.user.myAnime ? this.state.user.myAnime.map((data, index) => {
            console.log(data, "data")
            return(
                <div className="myAnimu">
                    <img src={data.image} alt="anime cover"/>
                    <div>
                    <h4>{data.name}</h4>
                    <button onClick={() => this.deleteAnime(data._id)}>Remove from List</button>
                    </div>
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