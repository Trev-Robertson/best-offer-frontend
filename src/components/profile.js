import React from "react";
import NewTaskForm from "./NewTaskForm";
import { isEmpty } from "lodash";
// import {Link} from 'react-router-dom'
import { Card} from 'semantic-ui-react'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'


const TASKS = "http://localhost:3000/tasks/";

export default class extends React.Component {
  state = {
    specialties: [{id: 1, name: "gardening"},
     {id: 2, name: "capentry"},
     {id: 3, name: "plumbing"},
     {id: 4, name: "technology"},
     {id: 5, name: "electrician"} ],
    currentUser: {}
  };

  componentDidMount() {

    this.setState({
      currentUser: this.props.user
    })

  }

  addTask = (event, formState) => {
    event.preventDefault();
    let data = {
      name: event.target.headline.value,
      description: event.target.description.value,
      specialty_id: event.target.specialty.value,
      user_id: this.props.user.id
    };
    event.target.reset();
    console.log(event);
    fetch(TASKS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(currentUser =>
        this.setState({
          currentUser
        })
      );
  };

  sortBids = task => {
  
    let sorted = task.bids.sort((a, b) => (a.price > b.price ? 1 : -1));
   
      console.log()
    return sorted[0] ? `Lowest Bid: $${sorted[0].price}, by ${sorted[0].contractor.name}` : '  No Bids Yet'
  };

  CardExampleLinkCard = (task) => (
    
    <Card
      color='blue'
      href={`/task/${task.id}`}
      header={task.name}
      meta={task.specialty.name}
      description={`Description: ${task.description} ${this.sortBids(task)}`}
    /> 
  )

  render() {
    
    return (
      <div >
        <div>
        <h1> Hi, {this.props.user ? this.props.user.name : null}</h1>
          <br /><br /> 
        </div>
        <NewTaskForm
          specialties={this.state.specialties}
          addTask={this.addTask}
        />
         <br />
          <h1>Current Tasks:</h1>
        <div className='current-task' >
          
          <br /><br />
          {!isEmpty(this.state.currentUser)
            ? 
              this.state.currentUser.tasks.map(task => { 
              return  <div  key={Math.floor((Math.random() * 100000000000) + 1)} >
         { this.CardExampleLinkCard(task)}
         
              </div>})
              
            : null}
        </div>
      </div>
    );
  }
}




