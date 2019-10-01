import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TASKS = "http://localhost:3000/tasks/"

export default class ContractorTaskShowPage extends React.Component {
  state = {
    anyBidsSelected: false,
    sortedBids: [],
    currentTask: []
  };

  sortBids = (bids) => {

    let sorted = bids.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    
    return sorted;
  };

  bidAccepted = bid => {
    this.setState(
      {
        anyBidsSelected: true
      },
      () => this.props.acceptBid(bid, this.props.task)
    );
  };

  bidDeclined = bid => {
    if (bid.status) {
      this.setState(
        {
          anyBidsSelected: false
        },
        () => this.props.deleteBid(bid)
      );
    } else {
      this.props.deleteBid(bid);
    }
  };

  componentDidMount = () => {

    fetch(TASKS + this.props.id)
    .then(res => res.json())
    .then(task => {
      console.log(task)
      let sortedBids = this.sortBids(task.bids)
      this.setState({
        currentTask: task, 
        sortedBids: sortedBids
      })
      task.bids.forEach(bid => {
      if (bid.status) {
        this.setState({
          anyBidsSelected: true
        });
      }
    });
  });
  };

  CardExampleGroups = () => {
  
    let bid
    this.state.currentTask.task_done ? bid = this.state.currentTask.bids.find(bid => bid.status === true) : bid = this.state.sortedBids[0]
    
   return this.state.sortedBids[0] ?
     <Card.Group>
        <Card>
          <Card.Content >
           
         
           
          
            {bid.status ? <h1>Winning Bid</h1> : null}
            <Card.Header></Card.Header>
            <Card.Meta>
              {bid.status ? `Winning Bid: $${bid.price}` : null}
            </Card.Meta>
            
          </Card.Content>
          <Card.Content extra>
            {!bid.status ? 

              <div className="ui two buttons">
                <Button
                  disabled={bid.status}
                  onClick={() => console.log('click')}
                  basic
                  color="blue"
                >
                  Make a Bid
                </Button>
              </div>

              // <div className="ui two buttons">
              // <Button
              //   disabled={bid.status}
              //   onClick={() => console.log('click')}
              //   basic
              //   color="blue"
              // >
              //   Make a Bid
              // </Button>
              // </div>
             : null}
          </Card.Content>
        </Card>
      </Card.Group>
     : null
  };

  showBid = () => {
    
    let bid 
    if (this.state.currentTask.task_done){
      bid = this.state.currentTask.bids.find(bid => bid.status === true) 
    }
   else {  
     bid = this.state.sortedBids[0]
    }
     return bid ? bid.price : 0
   
  
  }

  render() {
  
    return (
      <div>
        <Link to="/profile">
          {" "}
        </Link>
           <h1>
          Title:{" "}
          <h3>
            <strong>{this.state.currentTask.name}</strong>
          </h3>{" "}
        </h1>
        <h1>
          Description: <h3>{this.state.currentTask.description}</h3>{" "}
        </h1>
        <div>
        {this.state.currentTask.task_done ? <h1> Winning Bid: {this.showBid()}</h1> : <h1>Lowest Current Bid: ${this.showBid()}</h1>}
        {/* <h1>Lowest Current Bid: ${this.state.sortedBids[0]? this.state.sortedBids[0].price: null}</h1> */}
        </div>
       
        <div className="bids">
              {this.CardExampleGroups()}
        </div>
      </div>
    );
  }
}
