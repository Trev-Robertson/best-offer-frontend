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

    console.log();
    return sorted[0]
      ? `Lowest Bid: $${sorted[0].price}, by ${sorted[0].contractor.name}`
      : "  No Bids Yet";
  };

  CardExampleLinkCard = task => (
    <Card
      key={Math.floor(Math.random() * 100000000000 + 1)}
      
      color="blue"
      href={`/task/${task.id}`}
      header={task.name}
      meta={task.specialty.name[0].toUpperCase() + task.specialty.name.slice(1)}
      description={`Description: ${task.description} ${this.sortBids(task)}`}
    />
  );

  render() {
    return (
      <div >
<div >


        <br />
<div >  
        <div>
          <h1> Hi, {this.props.user ? this.props.user.name : null}</h1>
          <br />
          <br />
         </div>
        <NewTaskForm
          specialties={this.state.specialties}
          addTask={this.props.addTask}
        />
</div>
<div >
        <h1>Active Tasks:</h1>
        <div className='current-task'>
          <br />
          <br />
          {!isEmpty(this.state.currentUser)
            ? 
            <Card.Group >
            {this.state.currentUser.tasks.map(task => {
                
                 return this.CardExampleLinkCard(task)}
                
                
              )}</Card.Group>
            : null}
        </div>
</div>
<div  >
    
        
</div>
      </div>
</div>
    );
  }
}
