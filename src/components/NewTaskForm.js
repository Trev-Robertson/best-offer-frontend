import React from 'react';
import { Form } from 'semantic-ui-react'
// import store from '../redux/store'
// import {Link} from 'react-router-dom'





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

          </div>
    )
    }
}    
