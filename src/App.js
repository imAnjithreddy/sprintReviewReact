import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser,logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import store from './store';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRouter';
if(localStorage.jwttoken){
  setAuthToken(localStorage.jwttoken);
  const decoded = jwt_decode(localStorage.jwttoken);
  //set user and isAuthentucated
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now()/1000;
  if(decoded.exp<currentTime){
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
    //Redirect to login
    window.location.href= "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store= {store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
