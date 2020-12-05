import React from "react";
import auth from "./auth-service";	// Importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {    
      return (
        <Consumer>
        {/* El componente <Consumer> provee un callback que recibe el "value" con el objeto Providers */}  
        { 
          ({login, signup, user, logout, isLoggedin}) => {
            return (
              <WrappedComponent 
                login={login} 
                signup={signup} 
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                {...this.props} />
            );
          }}
        </Consumer>
      );
    }
  };  
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    auth.me()
    //seteamos el estado a: isLoggedin: true, user: con el usuario conectado y isLoading en false 
    .then((user) => this.setState({ isLoggedin: true, user: user, isLoading: false }))
    //seteamos el estado a: isLoggedin: false, user: null, isLoading: false 
    .catch((err) => this.setState({ isLoggedin: false, user: null, isLoading: false }));
  }

  signup = (user) => {
    //desestructuramos username y password de user  
    const { username, password } = user;
    
    auth.signup({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user: user }))
      .catch(({response}) => this.setState({ message: response.data.statusMessage}));
  };

  login = (user) => {
    const { username, password } = user;

    auth.login({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user: user }))
      .catch((err) => console.log(err));
  };
	
  logout = () => {
    auth.logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };
	
  render() {
    //desestructutamos isLoading, isLoggedin y user del estado
    const { isLoading, isLoggedin, user } = this.state;
    // desestructuramos login, logout, signup
    const { login, logout, signup } = this;
    
    return (
      isLoading ? 
      <div>Loading</div> 
      :
      (<Provider value={{ isLoggedin, user, login, logout, signup}} >
         {this.props.children}
      </Provider>)
    )	/*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, withAuth };		//  <--	RECUERDA EXPORTAR  ! ! !

export default AuthProvider;		//	<--	RECUERDA EXPORTAR  ! ! !