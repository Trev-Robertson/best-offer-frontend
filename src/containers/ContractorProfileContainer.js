import React from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
// import store from '../redux/store'
import ContractorProfile from '../components/ContractorProfile'
import ContractorTaskShowPage from "../components/ContractorTaskShowPage";
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const BIDS_URL = 'http://localhost:3000/bids/'

export default class ContractorProfileContainer extends React.Component {
  state = {
    
  };





  render() {
    
    return (
      <div>
        {/* <ContractorProfile contractor={this.props.contractor}/> */}

        <Route
          exact
          path={`${this.props.match.url}/task/:id`}
          render={props => { 
            // debugger
            // let taskObj = this.props.contractor.bids.find(
            //   bid => bid.task.id == props.match.params.id
            // )
      
            
            return <ContractorTaskShowPage 
            id={props.match.params.id}
            />
          }}
        />

        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => {
           return <ContractorProfile contractor={this.props.contractor}/>
            }}
        />
      </div>
    );
  }
}
