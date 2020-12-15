import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';


class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
      <div>
        <Link to={"/"} className='home-btn'>
        <img className="logo" src="https://res.cloudinary.com/dh2lo8p1f/image/upload/v1607674460/fotos/kisspng-slime-rancher-puddle-blushing-puddle-5abf99dd683f02.693974441522506205427_thp0a6.png" alt="logo"/>
        </Link>
        </div>
        {isLoggedin ? (
          <div className="navbar-logged">
        
          <button className="navbar-button">
            <Link to={`/profile/${user._id}`}>
            Profile
            </Link>
            </button>
            <button className="navbar-button" onClick={logout}>
            Logout
            </button>
          </div>
        ) : (
          <div className="navbar-logged">
            <Link to="/login">
              <button className="navbar-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="navbar-button">SignUp</button>
            </Link>
          </div>
        )}
      </nav>
      );
    }
  }

export default withAuth(Navbar);


        
      
