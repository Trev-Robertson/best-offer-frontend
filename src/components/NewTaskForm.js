import React from 'react';
import { Form } from 'semantic-ui-react'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]


export default class NeWTask extends React.Component {

    state = {}

    handleChange = (e, { value }) => { 
        
        this.setState({ value })
    }

    renderForm = () => {
        const { value } = this.state
       return (<Form onSubmit={(event) => this.props.addTask(event, this.state)} >
        <Form.Group widths='equal'>
          <Form.Input fluid name='headline' label='Headline' placeholder='Headline' />
 
        </Form.Group>
        <Form.Group inline>
          <label>Select Specialty</label>
          
 {this.props.specialties.map( specialty => { 
          return <Form.Radio
          key={specialty.id}
           name='specialty'
           label={specialty.name[0].toUpperCase() + specialty.name.slice(1)}
           value={specialty.id}
           checked={value === specialty.id}
           onChange={this.handleChange}
         />
 })}
          
        </Form.Group>
        <Form.TextArea label='Description' name='description' placeholder='Please Describe What You Need Done' />
      
        <Form.Button>Submit</Form.Button>
      </Form>)
      }

    render(){
      
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {this.renderForm()}
            {/* <form onSubmit={(event) => this.props.addTask(event)} >
           <label name="name">Name</label>
              <input name="name" />
              
              <br />
              <p>
              <label name="description">Description</label>
              <textarea name="description" type='text'/>
              <br />
              <br />
              <select name='specialty'>
                  {this.props.specialties.map( specialty =>  <option key={specialty.id} value={specialty.id}>{specialty.name}</option>)
            
                  }
            </select>
            <br />
            <br />
               <button>Create Task!</button>
            </p>
            </form>  */}
          </div>
    )
    }
}    
    // t.string "name"
    // t.text "description"
    // t.bigint "user_id"
    // t.bigint "specialty_id"
{/* // this.props.specialties.map( specialty => {  */}
//            <Form.Radio
//            label={specialty.name}
//            value={specialty.id}
//            checked={value === specialty.id}
//            onChange={this.handleChange}
//          />})}