import React from "react";



export default class ProfileContainer extends React.Component {
 
 
    sortBids = () => {
        let sorted = this.props.task.bids.sort((a, b) => (a.price > b.price ? 1 : -1));
        return sorted
      }
 
    render() {
        // debugger
    return (
      <div onClick={this.props.togglePage}>
          <h1>Task:</h1> <h3>{this.props.task.name}</h3> 
          <h1>Description:</h1>  <h3>{this.props.task.description}</h3>
         
                {
                    this.sortBids().map(bid => {
                       return <p>${bid.price} by <strong>{bid.contractor.name}</strong></p>
                    })
                }    
            
      </div>
    );
  }
}

// {
//     this.sortBids().map(bid => {
//         <p key={Math.floor((Math.random() * 100000000000) + 1)}>
//            Bid: <p>{bid.price} by: {bid.contractor.name}</p>
//         </p>
//     })
// }  