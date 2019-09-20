import React from 'react';
import NewTaskForm from '../components/NewTaskForm'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'


export default class Profile extends React.Component {
    render(){
      console.log('task', this.props)
        return(
            <div className='columns'>
            <div className='column'>
              Hi, {this.props.user ? this.props.user.name : null}
            </div>
            <NewTaskForm specialties={this.props.specialties}/>
            <div className='column'>
              Current Bids {this.props.user ? this.props.user.tasks.map(task => <p key={task.id}> Job: {task.name} <br/><br/> Description: {task.description} <br/><br/> Active Bids: {task.bids.map(bid => <p>${bid.price} by {bid.contractor.name}</p>)} </p>) : null}
            </div>
        </div>
    )
    }
}

