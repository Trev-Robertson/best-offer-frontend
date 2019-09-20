import React from 'react';
import './App.css';
import './App.sass'
import Login from './components/Login'
import Profile from './containers/ProfileContainer'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


const URL = 'http://localhost:3000/users'



export default class App extends React.Component{

  state = {
    allUsers: []
  }


  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(allUsers => this.setState({
      allUsers
    }))
  }

  render(){
  return (
    <div className="App">
      <h1>BEST OFFER OR ELSE</h1>
      <Switch>
      <Route path='/profile' render={ () => <Profile users={this.state.allUsers}/>} />
        <Route path='/login' component={Login}/>
        <Route path='/' component={Login}/>
      </Switch>
    </div>
  );
  }
}


