import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
    render() {
        return (
            <div>
                <h2>Welcome {username}</h2>
                <img src="" alt="profile image"/>
                <Link path="/:id/edit">
                <p>You Anime List</p>  
            </div>
        )
    }
}

export default Profile;