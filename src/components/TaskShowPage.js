import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'






export default class TaskShowPage extends React.Component {

  state = {
    anyBidsSelected : false,
    sortedBids: []
  }

  sortBids = () => {
    let sorted = this.props.task.bids.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    return sorted;
  };


  bidAccepted = (bid) => {
    this.setState({
      anyBidsSelected: true
    }, () => this.props.acceptBid(bid))
    
  }

  bidDeclined = (bid) => {
    if(bid.status){
    this.setState({
      anyBidsSelected: false
    }, () => this.props.deleteBid(bid)) 
    
  }
  else {
    this.props.deleteBid(bid)
  }
  }


  componentDidMount = () =>{

    this.props.task.bids.forEach(bid=> {
      if(bid.status){
        this.setState({
          anyBidsSelected: true
        })
        return true
      }
    })

    this.setState({
      sortedBids: this.sortBids().map(bid => bid.status)
    })
  }

CardExampleGroups = (bid, index) => {  

 return( 
 <Card.Group>
      <Card >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
            />
              <h1>{index === 0 && !this.state.anyBidsSelected ? 'Best Value!': null}</h1>
        {bid.status ? <h1>Congrats!!!!! You selected this bid!</h1> :
          null
          }
          <Card.Header>{bid.contractor.name}</Card.Header>
          <Card.Meta>Top Contractor! </Card.Meta>
          <Card.Description>
          {bid.contractor.name} Pick Me!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            {!bid.status ?
          <div  className='ui two buttons'>
            <Button disabled={this.state.anyBidsSelected} onClick={() => this.bidAccepted(bid)} basic color='blue'>
              Accept bid of ${bid.price}
            </Button> 
            <Button disabled={bid.status ? true : null} onClick={() => this.bidDeclined(bid)} basic color='red'>
             { this.state.anyBidsSelected ? 'Delete Bid' : 'Decline Bid'}
            </Button > 
          </div> : null}
        </Card.Content>
      </Card>
    </Card.Group>)
   
    {/* // <p key={Math.floor((Math.random() * 100000000000) + 1)}>
    //   ${bid.price} by <strong>{bid.contractor.name}</strong>
    // </p>  */}
}


  render() {
    
    return (
      <div onClick={this.props.toggleTask} >
        <Link to='/profile'> <button>To Profile Page</button></Link>
        <h1>Title:</h1> <h2><strong>{this.props.task.name}</strong></h2>
        <h1>Description:</h1> <h3>{this.props.task.description}</h3>
        <h1>Bids:</h1>
        <div className='bids'>
        {this.sortBids().map((bid, index) =>   <div  key={Math.floor((Math.random() * 100000000000) + 1)}> {this.CardExampleGroups(bid, index)}</div>)}
        </div>
      </div>
    );
  }
}





