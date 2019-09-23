import React from "react";
import "./App.css";

import "./App.sass";
import Login from "./components/Login";
import ProfileContainer from "./containers/ProfileContainer";
import TaskShowPage from "./components/TaskShowPage";
import { isEmpty } from "lodash";
// import ReactDOM from "react-dom";
import {
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
    // currentTask: null
  };

  // componentDidMount(){
  //   fetch(URL)
  //   .then(res => res.json())
  //   .then(allUsers => this.setState({
  //     allUsers
  //   }))
  // }

  updateUser = (user) => {
    this.setState({
      currentUser: user, 
      loading: false
    })
  }

  currentTask = (task) =>{
    // debugger
    this.setState({
      currentTask: task
    })
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      currentUser: {}
    })
  };

  componentDidMount = () => {
    if(localStorage.getItem("token")){
      console.log('found token')
      fetch(PROFILE_URL, {
        headers: { "Authentication": 
        `Bearer ${localStorage.getItem("token")}` 
        }
      }
      )
      .then(res => res.json())
      .then(res => {
         console.log(res)
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

  render() {
    return (
      <div className="App">
        <h1>BEST OFFER OR ELSE</h1>
        <p>
          <button onClick={this.logout}>Logout</button>
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

            
              <Route exact 
                path="/profile/:task"
                render={(props) => 
                  this.state.currentTask ?
               <TaskShowPage
                    // user={this.props.user}
                    task={this.state.currentTask}
                    // togglePage={this.showTaskPage}
                />
                :
                <Redirect to="/profile" />
                  } 
                    />

          <Route
            exact
            path="/profile"
            render={() =>
              !isEmpty(this.state.currentUser) ? (
                <ProfileContainer
                  user={this.state.currentUser}
                  specialties={specialties}
                  currentTask={this.currentTask}
                />
              ) : 
                <Redirect to="/login" />
              }/>
            
            
            
              
            

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
