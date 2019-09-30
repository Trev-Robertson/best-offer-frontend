import React from "react";
// import store from "../redux/store";
import {Link} from 'react-router-dom'


export default class Login extends React.Component {
 
 
  render() {
    return (
      <div>
  
        <p>
         
        {this.props.newUser ? 'Sign Up Here!' : 'Please Log In'}</p>
        <form onSubmit={(event) => this.props.handleUser(event, this.props.newUser, this.props.contractor)}>
          <label name="name">Name</label>
          <input name="name" />
          <br />
          <label name="name">Password</label>
          <input name="password" type="password" />
          <br />
           <button>{this.props.newUser ? 'Create User' : 'Login'}</button>
        </form>
        <br/>
        {this.props.newUser ?<p> Already a Member? <Link to='/login'>Click Here To Go To Login Page</Link> </p> 
             : <p> Want to Join? <Link to='/signup'> Click Here To Sign Up!</Link></p>}
      </div>
    );
  }
}
