import React from "react";
// import store from '../redux/store'
import Profile from "../components/profile";

export default class ProfileContainer extends React.Component {
  state = {
    showProfile: true,
    task: null
  };

  showTaskPage = task => {
    this.setState({
      task: task,
      showProfile: !this.state.showProfile
    });
  };

  render() {
    return (
      <div>
        <div>
          <Profile
            user={this.props.user}
            showTaskPage={this.showTaskPage}
            tasks={this.props.tasks}
            addTask={this.props.addTask}
          />
        </div>
      </div>
    );
  }
}

{/* <Switch>
          {this.state.showTaskPage ? (
            <Route
              exact
              path={`${this.props.match.url}/task/:id`}
              render={routerProps => {
                // let taskObj = this.props.contractor.bids.find(
                //   bid => bid.task.id == props.match.params.id
                // )

                return (
                  <ContractorTaskShowPage
                    id={routerProps.match.params.id}
                    contractor={this.props.contractor}
                    makeABid={this.props.makeABid}
                    contractorDeleteBid={this.props.contractorDeleteBid}
                    routerProps={routerProps}
                    anyBidsSelected={this.state.anyBidsSelected}
                    sortedBid={this.state.sortedBid}
                    currentTask={this.state.currentTask}
                    updateCurrentTask={this.updateCurrentTask}
                  />
                );
              }}
            />
          ) : (
            <Redirect to="/opentasks" />
          )}

          <Route
            path={`${this.props.match.url}`}
            render={routerProps => {
              return (
                <ContractorProfile
                  contractor={this.props.contractor}
                  routerProps={routerProps}
                />
              );
            }}
          />
        </Switch> */}