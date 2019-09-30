import React from "react";
import { isEmpty } from "lodash";
// import {Link} from 'react-router-dom'
import { Card } from "semantic-ui-react";
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const TASKS = "http://localhost:3000/tasks/";

export default class ContractorProfile extends React.Component {
  state = {
 
  };

  componentDidMount() {
  
  }

  

  CardExampleLinkCard = task => {
    // debugger;
    return (
      <Card
        key={Math.floor(Math.random() * 100000000000 + 1)}
        color="blue"
        href={`/task/${task.id}`}
        header={task.name}
        meta={
          task.specialty.name[0].toUpperCase() + task.specialty.name.slice(1)
        }
        description={`Description: ${task.description} ${this.sortBids(task)}`}
      />
    );
  };

 

  render() {
    return (
      <div>
       
              <h1> Hi, {this.props.contractor ? this.props.contractor.name : null}</h1>
   
      </div>
    );
  }
}
