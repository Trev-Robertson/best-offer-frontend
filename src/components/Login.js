import React from "react";
// import store from "../redux/store";
// import {Link} from 'react-router-dom'


export default class Login extends React.Component {
  render() {
    return (
      <div>
        Login
        <form onSubmit={this.props.login}>
          <label name="name">Name</label>
          <input name="name" />
          <br />
          <label name="name">Password</label>
          <input name="password" type="password" />
          <br />
           <button>Login</button>
        </form>
      </div>
    );
  }
}
