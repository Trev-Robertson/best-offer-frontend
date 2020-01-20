import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
// import store from "../redux/store";
import {Link} from 'react-router-dom'


export default class Login extends React.Component {

  state = {
    specialties: [
      { id: 1, name: "gardening" },
      { id: 2, name: "carpentry" },
      { id: 3, name: "plumbing" },
      { id: 4, name: "technology" },
      { id: 5, name: "electrician" }
    ],

    selectedSpecialties: [], 
    letCheck: true
  }
  handleChange = (e, { value }) => {
    this.setState({ value });
  }



  includedSpecialties = (event, specialty) => {
    // debugger
     let array = [...this.state.selectedSpecialties]
     array.push(specialty)
     this.setState({selectedSpecialties: array}, this.specialtyCount)
     
  }

  specialtyCount = () => {
    if(this.state.selectedSpecialties.length > 2){
     
      console.log("This is more than 2")
    }
  }

  checkOrNot = () => {
      let luckyPerson = (this.state.selectedSpecialties.length <= 2)

      console.log(luckyPerson)

      return luckyPerson
    
  }
 
  render() {
  
    return (
      <div>

    {this.props.contractor ?
                <h2> Welcome Contractors! </h2> : <h2>Welcome Users!</h2>}
        <h4>
        {this.props.newUser  ? 'Sign Up Here!' : 'Please Log In'}</h4>
        <div className='contractor-display'>
        <Form onSubmit={(event) => this.props.handleUser(event, this.props.newUser, this.props.contractor, this.state.selectedSpecialties)}>
          
        <Form.Field>
          <label name="name">Name</label>
          <Form.Input name="name" />
          </Form.Field>
          <br />
          <Form.Field>
          <label name="name">Password</label>
          <Form.Input name="password" type="password" />
          <br />
          {this.props.newUser  ? <React.Fragment> <label name="phone">Phone Number (Format: ##########)</label>
           <Form.Input name="phone" type="tel" pattern="\d{10}"/>
           <Form.Group inline>
          <label>Select Specialty</label>

          {this.state.specialties.map(specialty => {
            return (
              <Checkbox 
              label={specialty.name[0].toUpperCase() + specialty.name.slice(1)}
              value={specialty.id}
              onChange={(event) => this.includedSpecialties(event, specialty)}
              
              />
         
              );
          })}
        </Form.Group>
   
           <br/>
           </React.Fragment>
           : null}
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