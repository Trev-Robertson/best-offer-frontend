import React from "react";
// import store from '../redux/store'
import Profile from "../components/Profile";
import NewTaskForm from "../components/NewTaskForm";

export default class ProfileContainer extends React.Component {
  render() {
    return (
      <div className="columns">
        <div className="column" style={{ justifyContent: "flex-end" }}>
          <Profile
            user={this.props.user}
            specialties={this.props.specialties}
          />
        </div>
      </div>
    );
  }
}
