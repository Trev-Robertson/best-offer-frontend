import React from "react";
// import store from '../redux/store'
import ContractorProfile from '../components/ContractorProfile'
import TaskShowPage from "../components/TaskShowPage";
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class ContractorProfileContainer extends React.Component {
  state = {};

  render() {
    
    return (
      <div>
        {/* <ContractorProfile contractor={this.props.contractor}/> */}

        <Route
          exact
          path={`${this.props.match.url}/task/:id`}
          render={props => { return <TaskShowPage />
          }}
        />

        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => (
            <ContractorProfile contractor={this.props.contractor}/>
          )}
        />
      </div>
    );
  }
}
