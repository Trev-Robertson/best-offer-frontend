import React from "react";
// import store from "../redux/store";
import {Link} from 'react-router-dom'


export default class Login extends React.Component {
 
 
  render() {
  
    return (
      <div>

    {this.props.contractor ?
                <h2> Welcome Contractors! </h2> : <h2>Welcome Users!</h2>}
        <h4>
        {this.props.newUser  ? 'Sign Up Here!' : 'Please Log In'}</h4>
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
        { this.props.routerProps.match.url !== '/login/contractor' && this.props.routerProps.match.url !== '/signup/contractor' ? 
           this.props.newUser? <p> Already a Member? <Link to='/login'>Click Here To Go To Login Page</Link> </p>
             : <p> Want to Join? <Link to='/signup'> Click Here To Sign Up!</Link></p> : null}
         
             
              {this.props.routerProps.match.url !== '/login/contractor'  && this.props.routerProps.match.url !== '/signup/contractor' ?

              <p> Contractors <Link to='/login/contractor'> Click Here To Login </Link></p> 

              : null}

              {
                this.props.routerProps.match.url === '/login/contractor' ? 
                <p> Want to Join? <Link to='/signup/contractor'> Click Here To Sign Up!</Link></p>
                :
                null 

              }

              {
                this.props.routerProps.match.url === '/signup/contractor' ? 
                <p> Already a Member? <Link to='/login/contractor'> Click Here Login</Link></p>
                :
                null
              }

                  {
                    this.props.routerProps.match.url === '/login/contractor'  || this.props.routerProps.match.url === '/signup/contractor' ?
                    <p> Have a job you need done? <Link to='/login'>Click Here</Link> </p> : null
                  }

      </div>
    );
  }
}

{/* <p> Want to Join? <Link to='/signup'> Click Here To Sign Up!</Link></p></div> */}
{/* <p> Contractors <Link to='/login/contractor'> Click Here To Login or Sign up</Link></p> */}
{/* <p> Contractors <Link to='/login/contractor'> Click Here To Login or Sign up</Link></p> */}