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

  deleteAnime = async(props) =>{
    let { image, name } = props;
    await axios.delete(`http://localhost:4000/profile/favorites/${this.props.user._id}`, {image, name})
  };

  componentDidMount(){
      this.getProfile();
  }

  render() {
    console.log(this.props.user.username, "data")
    return (
      <div>
        <h2>Welcome {this.props.user.username} </h2>
        <img src={this.state.user.image} alt="profile"/>
        <Link to={`/profile/${this.props.match.params.id}/edit`}>Edit your Profile</Link>
        <section>
          <p>Your Anime List</p> 
          <div>
          {this.props.user.myAnime ? this.props.user.myAnime.map((data, index) => {
            return(
                <div>
                    <img src={data.image} alt="anime cover"/>
                    <h4>{data.title}</h4>
                    <button onClick={() => this.deleteAnime()}>Remove from List</button>
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