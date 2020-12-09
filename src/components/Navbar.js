import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';


class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    console.log(this.props)
    return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn'>
        <h4>Slimu Anime 2.0</h4>
        </Link>
        {isLoggedin ? (
          <>
            <Link to={`/profile/${user._id}`} className='navbar-user'>{user.email}</Link>
            <button className='navbar-button' onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='navbar-button'>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button'>Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
