import React from "react";
import NewTaskForm from "./NewTaskForm";
import { isEmpty } from "lodash";
import {Link} from 'react-router-dom'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const SPECIALTIES = "http://localhost:3000/specialties/";
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
    fetch(SPECIALTIES)
      .then(res => res.json())
      .then(specialties =>{
      
        this.setState({
          currentUser: this.props.user
        })
        
      });
  }

  addTask = event => {
    event.preventDefault();
    let data = {
      name: event.target.name.value,
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
    return sorted[0] ? `${sorted[0].price} by ${sorted[0].contractor.name}` : '  No Bids Yet'
  };

  render() {
    return (
      <div className="columns">
        <div className="column">
          Hi, {this.state.currentUser ? this.state.currentUser.name : null}
        </div>
        <NewTaskForm
          specialties={this.state.specialties}
          addTask={this.addTask}
        />
        <div className="column">
          Current Tasks{" "}
          <br /><br />
          {!isEmpty(this.state.currentUser)
            ? this.state.currentUser.tasks.map(task =>  
              <Link to={`/profile/${task.name}`}>
              <div key={Math.floor((Math.random() * 100000000000) + 1)}>
            <div  onClick={() => this.props.currentTask(task)} >
                  {" "}
                  Job: {task.name}
                  <br /> Description: {task.description} <br />
                   Current Lowest Bid: ${this.sortBids(task)}
                   <br /><br /><br />
                </div>
                </div>
                </Link>
              )
            : null}
        </div>
      </div>
    );
  }
}
