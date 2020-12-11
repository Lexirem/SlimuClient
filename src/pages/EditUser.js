import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../lib/auth-service";


class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      image: this.props.user.image,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { username, email, image } = this.state;

    axios
      .put(
        `${process.env.REACT_APP_API_URI}/profile/${this.props.match.params.id}/edit`,
        {
          username,
          email,
          image,
        }
      )
      .then(() => {
        this.props.history.push(`/profile/${this.props.match.params.id}`);
      })
      .catch((err) => console.log(err));
  };

  handleChangeUser = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = async (e) => {
    const upload = new FormData();
    upload.append("image", e.target.files[0]);
    try {
      const res = await service.handleUpload(upload);
      this.setState({ image: res.secure_url });
    } catch (error) {
      console.log(error);
    }
  };

  render(){
      return(
          <div>
              <h2>Edit your Profile</h2>
              <form className="edit-info" onSubmit={this.handleFormSubmit}>
                  <label><b>Username:</b></label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={(e) => this.handleChangeUser(e)}
                  />
                  <br/>
                  <label><b>Email:</b></label>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleChangeUser(e)}
                  />
                  <br/>
                  <label><b>Image:</b></label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => this.handleFileUpload(e)}
                  /> 
                  <input type="submit" value="Submit"/>
              </form>
          </div>
      )
  }
}

export default withAuth(EditUser);
