import React from "react";
// import store from '../redux/store'
import Profile from "../components/profile";



export default class ProfileContainer extends React.Component {

    state = {
      showProfile: true,
      task: null
    }


    showTaskPage = (task) =>{
      this.setState({
       task: task,
        showProfile: !this.state.showProfile
      })
      
    }

  render() {

    return (
      <div >
        <div >
        
            
         
        <Profile
            user={this.props.user}
            showTaskPage={this.showTaskPage}
            tasks={this.props.tasks}
            />
            
        
         
        </div>
      </div>
    );
  }
}




            