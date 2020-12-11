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
          <img className="logo" src="https://res.cloudinary.com/dh2lo8p1f/image/upload/v1607674460/fotos/kisspng-slime-rancher-puddle-blushing-puddle-5abf99dd683f02.693974441522506205427_thp0a6.png" />
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
