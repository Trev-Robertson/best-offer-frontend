import React from 'react';
import './App.css';

import Login from './components/Login'
import Profile from './containers/ProfileContainer'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


const URL = 'http://localhost:3000/users'



export default class App extends React.Component{

  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render(){
  return (
    <div className="App">
      <h1>BEST OFFER OR ELSE</h1>
      <Switch>
      <Route path='/profile' component={Profile}/>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Login}/>
      </Switch>
    </div>
  );
  }
}


