import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default class ProfileContainer extends React.Component {
  sortBids = () => {
    let sorted = this.props.task.bids.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    return sorted;
  };


CardExampleGroups = (bid) => (  <Card.Group >
      <Card >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
          />
          <Card.Header>{bid.contractor.name}</Card.Header>
          <Card.Meta>Top Contractor!</Card.Meta>
          <Card.Description>
          {bid.contractor.name} will do it for less!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue'>
              Accept bid of ${bid.price}
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
    // <p key={Math.floor((Math.random() * 100000000000) + 1)}>
    //   ${bid.price} by <strong>{bid.contractor.name}</strong>
    // </p> 
    )


  render() {
    
    return (
      <div onClick={this.props.toggleTask}>
        <h1 >Task:</h1> <h3>{this.props.task.name}</h3>
        <h1>Description:</h1> <h3>{this.props.task.description}</h3>
        <h1>Bids:</h1>
        {this.sortBids().map(bid =>   <div key={bid.id}>{this.CardExampleGroups(bid)}</div>)}
      </div>
    );
  }
}


// this.CardExampleGroups(bid)


