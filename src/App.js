import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthProvider from './lib/AuthProvider';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";

class App extends Component {
  render() {
    return (
      <AuthProvider>       
        <div className="container">
          <Navbar />
          <Switch>
            <AnonRoute path="/login" component={Login} />
            <AnonRoute path="/signup" component={SignUp} />
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path='/profile' component={Profile} />
          </Switch>  
        </div>

      </AuthProvider>
    );
  }
}

export default App;
