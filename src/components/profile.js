import React from "react";
import NewTaskForm from "./NewTaskForm";
import { isEmpty } from "lodash";
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const SPECIALTIES = "http://localhost:3000/specialties/";
const TASKS = "http://localhost:3000/tasks/";

export default class Profile extends React.Component {
  state = {
    specialties: [],
    currentUser: {}
  };

  componentDidMount() {
    fetch(SPECIALTIES)
      .then(res => res.json())
      .then(specialties =>
        this.setState({
          specialties: specialties,
          currentUser: this.props.user
        })
      );
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
    return sorted[0].price;
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
          {!isEmpty(this.state.currentUser)
            ? this.state.currentUser.tasks.map(task => (
                <p key={task.id}>
                  {" "}
                  Job: {task.name} <br />
                  <br /> Description: {task.description} <br />
                  <br /> Current Lowest Bid:{this.sortBids(task)}
                  {/* {task.bids.map(bid => (
                    <p>
                      ${bid.price} by {bid.contractor.name}
                    </p>
                  ))}{" "} */}
                </p>
              ))
            : null}
        </div>
      </div>
    );
  }
}
