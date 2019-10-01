import React from "react";
// import { isEmpty } from "lodash";
// import {Link} from 'react-router-dom'
import { Card } from "semantic-ui-react";
// import store from '../redux/store'
// import {Link} from 'react-router-dom'



export default class ContractorProfile extends React.Component {
  state = {
 
  };

  componentDidMount() {
  
  }

  sortBids = (bids) => {

    let sorted = bids.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    
    return sorted[0];
  };

  CardExampleLinkCard = bid => {
  
    return (
      <Card
        key={Math.floor(Math.random() * 100000000000 + 1)}
        color="blue"
        href={`contractor/task/${bid.task.id}`}
        header={bid.task.name}
        meta={!bid.task.task_done ? `Current lowest Bid: $${this.sortBids(bid.task.bids).price}`: null}
        description={!bid.status ? `Your Bid: $${bid.price}` : `You Won With A Bid Of: $${bid.price}!`}
      />
    );
  };

 

  render() {
      console.log(this.props.contractor)
    return (
      <div>
       
              <h1> Hi, {this.props.contractor ? this.props.contractor.name : null}</h1>

              <h1>Active Bids:</h1>
            <div className="current-task">
              {(this.props.contractor) ? (
                <Card.Group>
                  {this.props.contractor.bids.map(bid => {
                    return  !bid.task.task_done ? this.CardExampleLinkCard(bid) : null
                  })}
                
                </Card.Group>
              ) : null}
              </div>
              <div className="current-task">
                  <div>
              <h1>Winning Bids:</h1>
              {(this.props.contractor) ? (
                <Card.Group>
                  {this.props.contractor.bids.map(bid => {
                    return  bid.status ? this.CardExampleLinkCard(bid) : null
                  })}
                
                </Card.Group>
              ) : null}
              </div>
            </div>
   
      </div>
    );
  }
}
