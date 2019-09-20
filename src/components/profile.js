import React from 'react';
import store from '../redux/store'


export default class Profile extends React.Component {
    render(){

        
        return(
            <div className='columns'>
            {this.props.users[3] ? console.log(this.props.users[3].tasks) : null}
            <div className='column'>
              Hi, {this.props.users[3] ? this.props.users[3].name : null}
            </div>
            <div className='column'>
              Current Bids {this.props.users[3] ? this.props.users[3].tasks.map(task => <p key={task.id}> Job: {task.name} <br/><br/> Description: {task.description} <br/><br/> Active Bids: {task.bids.map(bid => <p>${bid.price} by {bid.contractor.name}</p>)} </p>) : null}
            </div>
        </div>
    )
    }
}

