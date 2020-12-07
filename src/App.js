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
import Private from "./pages/Private";

class App extends Component {
  render() {
    return (
      <AuthProvider>       
        <div className="container">
          <Navbar />
          <h1>Slimu Anime 2.0</h1>
          <Switch>
            <AnonRoute path="/login" component={Login} />
            <AnonRoute path="/signup" component={SignUp} />
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path='/private' component={Private} />
          </Switch>  
        </div>

      </AuthProvider>
    );
  }
}

export default App;
