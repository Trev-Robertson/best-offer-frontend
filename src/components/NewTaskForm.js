import React from 'react';
// import store from '../redux/store'
// import {Link} from 'react-router-dom'


export default class NeWTask extends React.Component {
    render(){
      
        return(
            <div>
            <form >
           <label name="name">Name</label>
              <input name="name" />
              
              <br />
              <p>
              <label name="description">Description</label>
              <textarea name="description" type='text'/>
              <br />
              <br />
              <select>
                  
            <option value="volvo">Volvo</option>

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