// Cuando el usuario está logueado, necesitamos redireccionarlo a la página private, en nuestro caso el componente `Private`
// Cuando el usuario no está logueado e intenta acceder a la página `/private` necesitamos direccionarlo al componente `Login`

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
 return (
  <Route
    {...rest}
    render={(props) => !isLoggedin ? <Component {...props} /> : <Redirect to="/private"/>}
   />
  );
}

export default withAuth(AnonRoute);