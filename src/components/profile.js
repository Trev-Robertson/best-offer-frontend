import React from "react";
import NewTaskForm from "./NewTaskForm";
import { isEmpty } from "lodash";
// import {Link} from 'react-router-dom'
import { Card } from "semantic-ui-react";
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const TASKS = "http://localhost:3000/tasks/";

export default class extends React.Component {
  state = {
    specialties: [
      { id: 1, name: "gardening" },
      { id: 2, name: "carpentry" },
      { id: 3, name: "plumbing" },
      { id: 4, name: "technology" },
      { id: 5, name: "electrician" }
    ],
    currentUser: {}
  };

  componentDidMount() {
    this.setState({
      currentUser: this.props.user
    });
  }

  sortBids = task => {
    let sorted = task.bids.sort((a, b) => (a.price > b.price ? 1 : -1));
    
    if(!task.task_done){
      return sorted[0]
      ? `Lowest Bid: $${sorted[0].price}, by ${sorted[0].contractor.name}`
      : "  No Bids Yet";}
      else{
        let bid = task.bids.find(bid => bid.status === true)
      
        return `Winning Bid: ${bid.price}, by $${bid.contractor.name}`
      }
  };

  CardExampleLinkCard = task => {
    
    return (
      <Card
        key={Math.floor(Math.random() * 100000000000 + 1)}
        color="blue"
        href={`/task/${task.id}`}
        header={task.name}
        meta={
          task.specialty.name[0].toUpperCase() + task.specialty.name.slice(1)
        }
        description={`Description: ${task.description},  ${this.sortBids(task)}`}
      />
    );
  };

  doneTaskNames = () => {

    let acceptBid = [];

    this.state.currentUser.tasks.map(task =>
      task.bids.map(bid => (bid.status === true ? acceptBid.push(task) : bid))
    );
     
    return acceptBid;
  };


  render() {
      
    return (
      <div>
        <div>
          <br />
          <div>
            <div>
              <h1> Hi, {this.props.user ? this.props.user.name : null}</h1>
              <br />
              <br />
            </div>
            <h1>What Do You Need Done?</h1>
            <NewTaskForm
              specialties={this.state.specialties}
              addTask={this.props.addTask}
            />
          </div>
          <div>
            <h1>Active Tasks:</h1>
            <div className="current-task">
              <br />
              <br />
              {!isEmpty(this.state.currentUser) ? (
                <Card.Group>
                  {this.state.currentUser.tasks.map(task => {
                    if(!task.task_done){
                    return this.CardExampleLinkCard(task);
                  }})}
                </Card.Group>
              ) : null}
            </div>
            <h1>Accepted Bids:</h1>
            <div className="current-task">
              {!isEmpty(this.state.currentUser) ? (
                <Card.Group>
                  {this.doneTaskNames().map(task => {
                    return this.CardExampleLinkCard(task);
                  })}
                </Card.Group>
              ) : null}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
