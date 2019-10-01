import React from "react";
import ContractorShowPage from "../components/ContractorShowPage";
import { Card } from "semantic-ui-react";
import { isEmpty } from "lodash";
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route
} from "react-router-dom";

const URL = "http://localhost:3000/tasks";
const REVIEWSURL = "http://localhost:3000/reviews";

export default class AllOpenTasks extends React.Component {
  state = {
    allTasks: [],
    profileSelected: [],
    newReview: true
  };

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(allTasks=> {
        this.setState({ allTasks });
      });
   
  }

  extra = contractor => {
    return this.state.allContractors ? (
      <h3>{`My Specialties Are ${contractor.specialties[0].name[0].toUpperCase() +
        contractor.specialties[0].name.slice(1)} 
       and ${contractor.specialties[1].name[0].toUpperCase() +
         contractor.specialties[1].name.slice(1)}`}</h3>
    ) : null;
  };





  CardExampleLinkCard = task => {
    return (
      <Card
        key={task.id}
        color="blue"
        href={`/contractor/task/${task.id}`}
        header={task.name}
        meta={""}
        description={task.description}
        extra={''}
      />
    );
  };

  render() {
    return (
      <div>
            <div className="contractor-display">
              <Card.Group itemsPerRow={4}>
                {this.state.allTasks.map(task => {
                  return this.CardExampleLinkCard(task);
                })}
              </Card.Group>
            </div>
  
        
      </div>
    );
  }
}
