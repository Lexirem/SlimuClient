import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';

class Signup extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signup({ email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>

          <label><b>Email: </b></label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          <br/>
          <label><b>Password: </b></label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Signup" />
        </form>
        
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
