import React from 'react';
import NewTaskForm from './NewTaskForm'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const SPECIALTIES = "http://localhost:3000/specialties/";
const TASKS =  'http://localhost:3000/tasks/'

export default class Profile extends React.Component {


  state = {
    specialties: [],
    currentUser: []
  }

  componentDidMount(){
    fetch(SPECIALTIES)
    .then(res => res.json())
    .then(specialties => this.setState({
      specialties
    }))
  }

    addTask = (event) =>{
   
        event.preventDefault()
        let data = {
          name: event.target.name.value,
          description: event.target.description.value,
          specialty_id: event.target.specialty.value,
          user_id: this.props.user.id
        }
        console.log(event)
    fetch(TASKS, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(currentUser => 
      console.log(currentUser)
      // this.setState({
      // currentUser
      // })
    )
    }


  
    render(){
     
        return(
            <div className='columns'>
            <div className='column'>
              Hi, {this.props.user ? this.props.user.name : null}
            </div>
            <NewTaskForm specialties={this.state.specialties} addTask={this.addTask}/>
            <div className='column'>
              Current Bids {this.props.user ? this.props.user.tasks.map(task => <p key={task.id}> Job: {task.name} <br/><br/> Description: {task.description} <br/><br/> Active Bids: {task.bids.map(bid => <p>${bid.price} by {bid.contractor.name}</p>)} </p>) : null}
            </div>
        </div>
    )
    }
}

