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
            currentTask={this.props.currentTask}
            />
            

            
         
        </div>
      </div>
    );
  }
}



{/* <TaskShowPage
// showTask={this.props.showTask}
  user={this.props.user}
  task={this.state.task}
  togglePage={this.showTaskPage}
/> */}

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