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

  

  CardExampleLinkCard = bid => {
        
    return (
      <Card
        key={Math.floor(Math.random() * 100000000000 + 1)}
        color="blue"
        href={`contractor/task/${bid.task.id}`}
        header={bid.task.name}
        meta={""}
        description={`Bid Amount: ${bid.price}`}
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
                    return this.CardExampleLinkCard(bid);
                  })}
                </Card.Group>
              ) : null}
            </div>
   
      </div>
    );
  }
}
