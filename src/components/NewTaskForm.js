import React from 'react';
// import store from '../redux/store'
// import {Link} from 'react-router-dom'

const URL = "http://localhost:3000/specialties/";

export default class NeWTask extends React.Component {






    render(){
      console.log(this.props)
        return(
            <div>
            <form onSubmit={this.props.addTask} >
           <label name="name">Name</label>
              <input name="name" />
              
              <br />
              <p>
              <label name="description">Description</label>
              <textarea name="description" type='text'/>
              <br />
              <br />
              <select name='specialty'>
                  {this.props.specialties.map( specialty =>  <option value={specialty.id}>{specialty.name}</option>)
            
                  }
            </select>
            <br />
            <br />
               <button>Create Task!</button>
            </p>
            </form>
          </div>
    )
    }
}    
    // t.string "name"
    // t.text "description"
    // t.bigint "user_id"
    // t.bigint "specialty_id"