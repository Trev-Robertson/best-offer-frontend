import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BidModal from './BidModal'

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



  componentDidMount = () => {
    fetch(TASKS + this.props.id)
    .then(res => res.json())
    .then(task => {
   
      let sortedBids = this.sortBids(task.bids)
      this.setState({
        currentTask: task, 
        sortedBids: sortedBids,
        
      })
      task.bids.forEach(bid => {
      if (bid.status) {
        this.setState({
          anyBidsSelected: true
        });
      }
    });
  })
  ;
  };

  CardExampleGroups = () => {
    let bid
    let myBid 
    this.state.currentTask.task_done ? bid = this.state.currentTask.bids.find(bid => bid.status === true) : bid = this.state.sortedBids[0]
    this.state.currentTask.bids ? myBid = this.props.contractor.bids.find(bid => bid.task.id === this.state.currentTask.id) : myBid = null
  //  debugger
   return this.state.sortedBids[0] ?
     <Card.Group>
        <Card>
          <Card.Content >

          {bid.status ? 
          <h1>{bid.contractor_id === this.props.contractor.id? 'Congrats You Won!' : 'Bidding Is Now Over '} </h1> 

          : 
          <h3>{myBid ?  `Your current bid is $${myBid.price}` : 'No Bids Yet, Bid now!'}</h3>
          
          }
            <Card.Header></Card.Header>
            <Card.Meta>
              {/* {bid.status ? `Winning Bid Was $${bid.price}` : null} */}
            </Card.Meta>
            
          </Card.Content>
          <Card.Content extra>
            {!bid.status ? 

              <div className="ui two buttons">
      
                 <BidModal 
                 makeABid={this.props.makeABid}
                 contractor={this.props.contractor}
                 task={this.state.currentTask}
                 />
              {myBid ?
              <Button
              basic
              color="red"
              onClick={(event) => this.props.contractorDeleteBid(event, myBid.id, this.props.contractor)}
              >Delete Bid</Button>
                : null}
              </div>


             : null}
          </Card.Content>
        </Card>
      </Card.Group>
     : null
  };

  showBid = () => {
    let contBid
    let bid 
    if (this.state.currentTask.task_done){
      bid = this.state.currentTask.bids.find(bid => bid.status === true) 
    }
   else {  
     bid = this.state.sortedBids[0] 
     contBid = this.props.contractor.bids.find(bid => bid.task.id === this.state.currentTask.id)
     if (bid && contBid){
       bid = bid.price < contBid.price ? bid : contBid
     }
      
    }
   
     return bid ? bid.price : 0
   
  
  }


  yourBid = (contractor) => {
    if(this.state.sortedBids[0]){
   return this.state.sortedBids[0].contractor_id === this.props.contractor.id ? `Congrats You Have The Current Lowest Bid Of $${this.showBid()}` : `Lowest Current Bid: $${this.showBid()}`
    }
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
        {this.state.currentTask.task_done ? <h1> Winning Bid: ${this.showBid()}</h1> : <h3>{this.yourBid()}</h3>}
        {/* <h1>Lowest Current Bid: ${this.state.sortedBids[0]? this.state.sortedBids[0].price: null}</h1> */}
        </div>
       
        <div className="bids">
              {this.CardExampleGroups()}
        </div>
      
      </div>
    );
  }
}
