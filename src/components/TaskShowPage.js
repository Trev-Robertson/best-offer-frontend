import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'






export default class TaskShowPage extends React.Component {
  sortBids = () => {
    let sorted = this.props.task.bids.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    return sorted;
  };


CardExampleGroups = (bid, index) => {  

 return <Card.Group >
      <Card >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
          />{!bid.status?
          <h1>{index === 0 ? 'Best Value!': null}</h1>
          :
          <h4>You selected this bid!</h4>
          }
          <Card.Header>{bid.contractor.name}</Card.Header>
          <Card.Meta>Top Contractor! </Card.Meta>
          <Card.Description>
          {bid.contractor.name} Pick Me!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div  className='ui two buttons'>
            <Button onClick={() => this.props.acceptBid(bid)} basic color='blue'>
              Accept bid of ${bid.price}
            </Button>
            {
            <Button onClick={() => this.props.deleteBid(bid)} basic color='red'>
              Decline Bid
            </Button >}
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
    // <p key={Math.floor((Math.random() * 100000000000) + 1)}>
    //   ${bid.price} by <strong>{bid.contractor.name}</strong>
    // </p> 
}


  render() {
    
    return (
      <div onClick={this.props.toggleTask}>
        <Link to='/profile'> <button>To Profile Page</button></Link>
        <h1>Description:</h1> <h3>{this.props.task.description}</h3>
        <h1>Bids:</h1>
        {this.sortBids().map((bid, index) =>   <div key={Math.floor((Math.random() * 100000000000) + 1)}> {this.CardExampleGroups(bid, index)}</div>)}
      </div>
    );
  }
}


// this.CardExampleGroups(bid)


