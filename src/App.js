import React from "react";
import "./App.css";
import "./App.sass";
import Login from "./components/Login";
import ProfileContainer from "./containers/ProfileContainer";
import { isEmpty } from "lodash";
// import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
const specialties = [
  "gardening",
  "plumbing",
  "technology",
  "electrician",
  "carpentry"
];
const URL = "http://localhost:3000/api/v1/login/";

export default class App extends React.Component {
  state = {
    currentUser: {}
  };

  // componentDidMount(){
  //   fetch(URL)
  //   .then(res => res.json())
  //   .then(allUsers => this.setState({
  //     allUsers
  //   }))
  // }

  logout = () => {
    console.log("click");
    this.setState({
      currentUser: {}
    })
  };

  currentUser = event => {
    event.preventDefault();
   
    let data = {
      name: event.target.name.value, 
      password: event.target.password.value
    }
    fetch(URL, {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
       console.log(data.user)
      if(data.authenticated){
        this.setState({
          currentUser: JSON.parse(data.user)
        })}
      });
  };

  render() {
    return (
      <div className="App">
        <h1>BEST OFFER OR ELSE</h1>
        <p>
          <button onClick={this.logout}>Logout</button>
        </p>
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <Redirect to="/profile" />
              ) : (
                <Login login={this.currentUser} />
              )
            }
          />

          <Route
            exact
            path="/profile"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <ProfileContainer
                  user={this.state.currentUser}
                  specialties={specialties}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    );
  }
}
