import React from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import "./App.sass";
import Login from "./components/Login";
import ProfileContainer from "./containers/ProfileContainer";
// import ContractorsContainer from "./containers/ContractorsContainer";
import TaskShowPage from "./components/TaskShowPage";
import ContractorShowPage from "./components/ContractorShowPage"
import { isEmpty } from "lodash";
import {Link} from 'react-router-dom'

import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
const specialties = [
  "gardening",
  "plumbing",
  "technology",
  "electrician",
  "carpentry"
];
const URL = "http://localhost:3000/api/v1/login/";
const PROFILE_URL = 'http://localhost:3000/api/v1/profile/'

export default class App extends React.Component {
  state = {
    currentUser: {}, 
    loading: true,
    removeTask: true,
    tasks: {}
   
  };

 

  updateUser = (user) => {
    console.log(user.tasks)
    this.setState({
      currentUser: user, 
      loading: false,
      tasks: user.tasks
    })
  }

  // currentTask = (task) =>{
  //   // localStorage.setItem("task", JSON.stringify(task))
  //   this.setState({
  //     currentTask: task
  //   })
  // }

  // toggleTask = () =>{
  //   this.setState({
  //     currentTask: null
  //   })
  // }

  logout = () => {
    localStorage.clear()
    this.setState({
      currentUser: {}
    })
  };

  componentDidMount = () => {
    if(localStorage.getItem("token")){
      
      fetch(PROFILE_URL, {
        headers: { "Authentication": 
        `Bearer ${localStorage.getItem("token")}` 
        }
      }
      )
      .then(res => res.json())
      .then(res => {
       
        this.updateUser(res)})
    }
    else{
      console.log('not found')
      this.setState({loading: false})
    }
  }


  currentUser = event => {
    event.preventDefault();
   
    let data = {
      name: event.target.name.value, 
      password: event.target.password.value
    }
    fetch(URL, {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
   
      if(data.authenticated){
        localStorage.setItem("token", data.token)
        this.setState({
          currentUser: JSON.parse(data.user)
        })}
      });
  };

  acceptBid = (bid) => {
    
    if(!bid.status){
    let data = {
      id: bid.id, 
      status: true,
      user_id: this.state.currentUser.id
    }
    fetch(`http://localhost:3000/bids/${bid.id}`, {
      method: 'PATCH', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(currentUser => this.setState({currentUser}))
  }
  
  }

  deleteBid = (bid) =>{
    let data = {
      id: bid.id,
      user_id: this.state.currentUser.id
    }
    fetch(`http://localhost:3000/bids/${bid.id}`, {
      method: 'DELETE', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(currentUser => {
      
    this.updateUser(currentUser)
    })
  }

  deleteTask = (task) =>{
    let currentUserTasks = this.state.currentUser.tasks.filter(t => t.id !== task.id)
    
    this.state.currentUser.tasks = currentUserTasks
   
    this.setState({
      currentUser: this.state.currentUser
    })
    let data = {
      id: task.id,
      user_id: this.state.currentUser.id
    }
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(currentUser => {
      this.updateUser(currentUser)})
  }

  render() {
    return (
      <div className="App">
        <h1>BEST OFFER OR ELSE</h1>
        <p>
          <button onClick={this.logout}>Logout</button>
          <Link to='/profile'> <button>To Profile Page</button></Link>
        </p>
        {!this.state.loading ? <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <Redirect to="/profile" />
              ) : (
                <Login login={this.currentUser} />
              )
            }
          />

            {!isEmpty(this.state.currentUser) ?
              <Route exact 
                path="/task/:id"
                render={(props) =>{  
                 let taskObj =  this.state.currentUser.tasks.find(task => task.id == props.match.params.id) 
                  return   !isEmpty(taskObj) ?
                  <TaskShowPage
                      task={taskObj}
                      toggleTask={this.toggleTask}
                      acceptBid={this.acceptBid}
                      deleteBid={this.deleteBid}
                      deleteTask={this.deleteTask}
                  />
                  :
                  <Redirect to="/profile" />
                    
                }}/>
              :
              
              <Redirect to="/login" />
              
              
              }




          <Route
            exact
            path="/profile"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <ProfileContainer
                  user={this.state.currentUser}
                  specialties={specialties}
                  tasks={this.state.tasks}
                />
              ) : 
                <Redirect to="/login" />
              }/>
            
            
            {/* <Route exact path='/contractors' render={() =>
              
                <ContractorsContainer
                  user={this.state.currentUser}
                  specialties={specialties}
                  currentTask={this.currentTask}
                />}/> */}
              
            

          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch> : null}
      </div>
    );
  }
}






// import React from "react";
// import "./App.css";
// import "./App.sass";
// import Login from "./components/Login";
// import ProfileContainer from "./containers/ProfileContainer";
// import { isEmpty } from "lodash";
// // import ReactDOM from "react-dom";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect
// } from "react-router-dom";
// const specialties = [
//   "gardening",
//   "plumbing",
//   "technology",
//   "electrician",
//   "carpentry"
// ];
// const URL = "http://localhost:3000/api/v1/login/";
// const PROFILE_URL = 'http://localhost:3000/api/v1/profile/'

// export default class App extends React.Component {
//   state = {
//     currentUser: {}, 
//     loading: true
//   };

//   // componentDidMount(){
//   //   fetch(URL)
//   //   .then(res => res.json())
//   //   .then(allUsers => this.setState({
//   //     allUsers
//   //   }))
//   // }

//   updateUser = (user) => {
//     this.setState({
//       currentUser: user, 
//       loading: false
//     })
//   }


//   logout = () => {
//     localStorage.clear()
//     this.setState({
//       currentUser: {}
//     })
//   };

//   componentDidMount = () => {
//     if(localStorage.getItem("token")){
//       console.log('found token')
//       fetch(PROFILE_URL, {
//         headers: { "Authentication": 
//         `Bearer ${localStorage.getItem("token")}` 
//         }
//       }
//       )
//       .then(res => res.json())
//       .then(res => {this.updateUser(res)})
//     }
//     else{
//       this.setState({loading: false})
//     }
//   }


//   currentUser = event => {
//     event.preventDefault();
   
//     let data = {
//       name: event.target.name.value, 
//       password: event.target.password.value
//     }
//     fetch(URL, {
//       method: 'POST', 
//       headers: { 
//         'Content-Type': 'application/json'
//       }, 
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(data => {
   
//       if(data.authenticated){
//         localStorage.setItem("token", data.token)
//         this.setState({
//           currentUser: JSON.parse(data.user)
//         })}
//       });
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1>BEST OFFER OR ELSE</h1>
//         <p>
//           <button onClick={this.logout}>Logout</button>
//         </p>
//         {!this.state.loading ? <Switch>
//           <Route
//             exact
//             path="/login"
//             render={() =>
//               !isEmpty(this.state.currentUser) ? (
//                 <Redirect to="/profile" />
//               ) : (
//                 <Login login={this.currentUser} />
//               )
//             }
//           />

//           <Route
//             exact
//             path="/profile"
//             render={() =>
//               !isEmpty(this.state.currentUser) ? (
//                 <ProfileContainer
//                   user={this.state.currentUser}
//                   specialties={specialties}
//                 />
//               ) : (
//                 <Redirect to="/login" />
//               )
//             }
//           />

//           <Route path="/" render={() => <Redirect to="/login" />} />
//         </Switch> : null}
//       </div>
//     );
//   }
// }
