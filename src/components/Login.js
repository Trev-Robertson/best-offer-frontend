import React from "react";
import { Form } from "semantic-ui-react";
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
        <div className='contractor-display'>
        <Form onSubmit={(event) => this.props.handleUser(event, this.props.newUser, this.props.contractor)}>
          
        <Form.Field>
          <label name="name">Name</label>
          <Form.Input name="name" />
          </Form.Field>
          <br />
          <Form.Field>
          <label name="name">Password</label>
          <Form.Input name="password" type="password" />
          <br />
          <Form.Button>{this.props.newUser ? 'Create User' : 'Login'}</Form.Button>
          </Form.Field>
        </Form>
        </div>
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


{/* <Form onSubmit={event => this.props.addTask(event, this.state)}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="headline"
            label="Post a Service You Need"
            placeholder="Enter Task"
          />
        </Form.Group>
        <Form.Group inline>
          <label>Select Specialty</label>

          {this.props.specialties.map(specialty => {
            return (
              <Form.Radio
                key={specialty.id}
                name="specialty"
                label={
                  specialty.name[0].toUpperCase() + specialty.name.slice(1)
                }
                value={specialty.id}
                checked={value === specialty.id}
                onChange={this.handleChange}
              />
            );
          })}
        </Form.Group>
        <Form.TextArea
          label="Description"
          name="description"
          placeholder="Please Describe What You Need Done"
        />

        <Form.Button>Submit</Form.Button>
      </Form> */}