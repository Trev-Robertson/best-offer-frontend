import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "./App.sass";
import Login from "./components/Login";
import ProfileContainer from "./containers/ProfileContainer";
import ContractorProfileContainer from "./containers/ContractorProfileContainer";
import ContractorsContainer from "./containers/ContractorsContainer";
import TaskShowPage from "./components/TaskShowPage";
// import ContractorShowPage from "./components/ContractorShowPage"
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import ContractorShowPage from "./components/ContractorShowPage";
const specialties = [
  "gardening",
  "plumbing",
  "technology",
  "electrician",
  "carpentry"
];
const URL = "http://localhost:3000/api/v1/login/";
const CONTRACTOR_URL = "http://localhost:3000/api/v1/contractor";
const PROFILE_URL = "http://localhost:3000/api/v1/profile/";
const TASKS = "http://localhost:3000/tasks/";

export default class App extends React.Component {
  state = {
    currentUser: {},
    loading: true,
    removeTask: true,
    tasks: {},
    currentContractor: {}
  };

  updateUser = user => {
    this.setState({
      currentUser: user,
      loading: false,
      tasks: user.tasks,
      currentContractor: {}
    });
  };

  refreshContractor = user => {
    this.setState({
      currentContractor: user,
      loading: false,
      currentUser: {}
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      currentUser: {},
      currentContractor: {}
    });
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      fetch(localStorage.getItem("contractor") === 'true' ? CONTRACTOR_URL : PROFILE_URL, {
        headers: { Authentication: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(res => {
        
          localStorage.getItem("contractor") ==='true'
            ? this.refreshContractor(res)
            : this.updateUser(res);
        });
    } else {
      this.setState({ loading: false });
    }
  };

  handleUser = (event, newUser, contractors) => {
    event.preventDefault();
    let contractor;
    if (contractors) {
      contractor = "contractor";
    }

    let data = {
      name: event.target.name.value,
      password: event.target.password.value,
      new_user: newUser
    };

    fetch(URL + (contractors ? contractor : ""), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.authenticated && contractor === "contractor") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("contractor", true);

          this.setState({
            currentContractor: JSON.parse(data.user),
            currentUser: {}
          });
        } else {
          if (data.authenticated) {
            localStorage.setItem("contractor", false);
            localStorage.setItem("token", data.token);
            this.setState({
              currentUser: JSON.parse(data.user),
              currentContractor: {}
            });
          }
        }
      });
  };

  acceptBid = (bid, task) => {
    if (!bid.status) {
      let data = {
        task: {
          id: task.id,
          task_done: true,
          user_id: this.state.currentUser.id,
          bids_attributes: {
            id: bid.id,
            status: true
          }
        }
      };

      fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(currentUser => this.setState({ currentUser }));
    }
  };

  addTask = event => {
    event.preventDefault();
    let data = {
      name: event.target.headline.value,
      description: event.target.description.value,
      specialty_id: event.target.specialty.value,
      user_id: this.state.currentUser.id
    };
    event.target.reset();

    fetch(TASKS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(currentUser => {
        console.log("end", currentUser);
        let updateUser = this.state.currentUser;
        updateUser.tasks = currentUser.tasks;
        this.setState({
          currentUser: updateUser
        });
      });
  };

  deleteBid = bid => {
    let data = {
      id: bid.id,
      user_id: this.state.currentUser.id
    };
    fetch(`http://localhost:3000/bids/${bid.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(currentUser => {
        this.updateUser(currentUser);
      });
  };

  deleteTask = task => {
    let data = {
      id: task.id,
      user_id: this.state.currentUser.id
    };
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(updatedUser => {
        let updateUser = this.state.currentUser;
        let currentUserTasks = updateUser.tasks.filter(t => t.id !== task.id);
        updateUser.tasks = currentUserTasks;
        this.setState({
          currentUser: updateUser
        });
      });
  };

  render() {
    return (
      <div className="App" style={{ height: "50vh" }}>
        <h1>BEST OFFER OR ELSE</h1>
        <p>
          {!isEmpty(this.state.currentUser) ? (
            <React.Fragment>
              <Link to="/profile">
                {" "}
                <button>To Profile Page</button>
              </Link>
              <Link to="/contractors">
                {" "}
                <button>View Contractors</button>
              </Link>
              <button onClick={this.logout}>Logout</button>
            </React.Fragment>
          ) : null}
          {!isEmpty(this.state.currentContractor) ? (
            <React.Fragment>
              <button onClick={this.logout}>Logout</button>
            </React.Fragment>
          ) : null}
        </p>
        {!this.state.loading ? (
          <Switch>





            <Route
              exact
              path="/contractor"
              render={(routerProps) => {
                debugger
                // let taskObj = this.state.currentContractor.bids.find(
                //   task => task.id == props.match.params.id
                // );
                 return !isEmpty(this.state.currentContractor) ? (
                <ContractorProfileContainer 
                {...routerProps} 
                contractor={this.state.currentContractor}
                // task={taskObj}
                // currentTask={this.currentTask}
                    acceptBid={this.acceptBid}
                    deleteBid={this.deleteBid}
                    deleteTask={this.deleteTask}
                
                />
                ) : (
                  <Redirect to="/login/contractor" />
                )
              }}
            />





            <Route
              exact
              path="/login/contractor"
              render={props => {
             
                return !isEmpty(this.state.currentContractor) ? (
                  <Redirect to="/contractor" />
                ) : (
                  <Login
                    handleUser={this.handleUser}
                    newUser={false}
                    contractor={true}
                    routerProps={props}
                 
                  />
                );
              }}
            />

            <Route
              exact
              path="/login"
              render={props => {
           
                return !isEmpty(this.state.currentUser) ? (
                  <Redirect to="/profile" />
                ) : (
                  <Login
                    handleUser={this.handleUser}
                    newUser={false}
                    contractor={false}
                    routerProps={props}
                   
                  />
                );
              }}
            />

                <Route
                  exact
                  path="/signup"
                  render={props =>
                    !isEmpty(this.state.currentUser) ? (
                      <Redirect to="/profile" />
                    ) : (
                      <Login
                        handleUser={this.handleUser}
                        newUser={true}
                        routerProps={props}
                        contractor={false}
                      />
                    )
                  }
                />

            <Route
              exact
              path="/profile"
              render={() => {
          
                return !isEmpty(this.state.currentUser) ? (
                  <ProfileContainer
                    user={this.state.currentUser}
                    specialties={specialties}
                    tasks={this.state.tasks}
                    addTask={this.addTask}
                  />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route
              path="/contractors"
              render={routerProps => {
                 return !isEmpty(this.state.currentUser) ?
                   <ContractorsContainer
                    user={this.state.currentUser}
                    specialties={specialties}
                    currentTask={this.currentTask}
                    {...routerProps}
                  /> : <Redirect to="/login" />
                ;
              }}
            />

            <Route
              path="/signup/contractor"
              render={props =>
                !isEmpty(this.state.currentContractor) ? (
                  <Redirect to="/contractor" />
                ) : (
                  <Login
                    handleUser={this.handleUser}
                    
                    contractor={true}
                    routerProps={props}
                    newUser={true}
                   
                  />
                )
              }
            />


            {!isEmpty(this.state.currentUser)  ? (
              <Route
                exact
                path="/task/:id"
                render={props => {
                  let taskObj = this.state.currentUser.tasks.find(
                    task => task.id == props.match.params.id
                  );
                
                  return !isEmpty(taskObj) ? (
                    <TaskShowPage
                      task={taskObj}
                      acceptBid={this.acceptBid}
                      deleteBid={this.deleteBid}
                      deleteTask={this.deleteTask}
                    />
                  ) : (
                    <Redirect to="/profile" />
                  );
                }}
              />
            ) : (
              <Redirect to="/login" />
            )}

 

            {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
          </Switch>
        ) : null}
      </div>
    );
  }
}
