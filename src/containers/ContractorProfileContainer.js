import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
// import store from '../redux/store'
import ContractorProfile from "../components/ContractorProfile";
import ContractorTaskShowPage from "../components/ContractorTaskShowPage";
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const TASKS = "https://best-offer-backend.herokuapp.com/tasks/";

export default class ContractorProfileContainer extends React.Component {
  state = {
    anyBidsSelected: false,
    sortedBid: [],
    currentTask: [],
    showTaskPage: true,
    loading: true
  };

  updateCurrentTask = (event, contractor, task) => {
    console.log("click");
  };

  componentDidMount = () => {
    if (this.props.location.pathname !== "/contractor") {
      fetch(TASKS + this.props.location.pathname.split("/").pop())
        .then(res => res.json())
        .then(task => {
          if (!task.error) {
            let sortedBids = this.sortBids(task.bids);
            this.setState({
              currentTask: task,
              sortedBid: sortedBids
            });
            task.bids.forEach(bid => {
              if (bid.status) {
                this.setState({
                  anyBidsSelected: true
                });
              }
            });
          } else {
            this.setState({
              showTaskPage: false,
              loading: false
            });
          }
        });
    }
  };

  sortBids = bids => {
    let sorted = bids.sort((a, b) => (a.price > b.price ? 1 : -1));

    return sorted[0];
  };

  render() {
    return (
      <div>
        <Switch>
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
        </Switch>
      </div>
    );
  }
}
