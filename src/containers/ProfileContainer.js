import React from "react";
// import store from '../redux/store'
import Profile from "../components/profile";
import TaskShowPage from "../components/TaskShowPage";

export default class ProfileContainer extends React.Component {

    state = {
      showprofilePage: true
    }


  render() {
    return (
      <div className="columns">
        <div className="column" style={{ justifyContent: "flex-end" }}>
          {this.state.showprofilePage ? <Profile
            user={this.props.user}
          />
          :
          <TaskShowPage
            user={this.props.user}
            />
          }
        </div>
      </div>
    );
  }
}
