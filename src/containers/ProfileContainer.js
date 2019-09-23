import React from "react";
// import store from '../redux/store'
import Profile from "../components/profile";
import TaskShowPage from "../components/TaskShowPage";
import {Link} from 'react-router-dom'
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class ProfileContainer extends React.Component {

    state = {
      profile: true,
      task: null
    }


    togglePage = (task) =>{
        let changeStatus = !this.state.profile
      this.setState({
       task: task,
        profile: changeStatus
      })
      
    }

  render() {
    return (
      <div className="columns">
        <div className="column" style={{ justifyContent: "flex-end" }}>
          <Switch>
            
          {this.state.profile 
          ? 
        <Profile
            user={this.props.user}
            showTaskPage={this.togglePage}
            />
            :
            <TaskShowPage
              user={this.props.user}
              task={this.state.task}
              togglePage={this.togglePage}
            />
            
          }
          </Switch>
        </div>
      </div>
    );
  }
}

//   <Route exact
//   path="/profile/task"
//   render={ () => <TaskShowPage
//   user={this.props.user}
//   task={this.state.task}
// />} />

{/* <Route
            exact
            path="/profile"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <ProfileContainer
                  user={this.state.currentUser}
                  
                /> */}