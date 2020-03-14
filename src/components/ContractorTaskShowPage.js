import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import BidModal from "./BidModal";

const TASKS = "https://best-offer-backend.herokuapp.com/tasks/";

export default class ContractorTaskShowPage extends React.Component {
  //   state = {
  //     anyBidsSelected: false,
  //     sortedBids: [],
  //     currentTask: []
  //   };

  // 3

  sortBids = bids => {
    let sorted = bids.sort((a, b) => (a.price > b.price ? 1 : -1));

    return sorted[0];
  };

  CardExampleGroups = () => {
    let bid;
    let myBid;

    this.props.currentTask.task_done
      ? (bid = this.props.currentTask.bids.find(bid => bid.status === true))
      : (bid = this.props.sortedBid);
    this.props.currentTask.bids
      ? (myBid = this.props.contractor.bids.find(
          bid => bid.task.id === this.props.currentTask.id
        ))
      : (myBid = null);

    return this.props.sortedBid ? (
      <Card.Group>
        <Card>
          <Card.Content>
            {bid.status ? (
              <h1>
                {bid.contractor_id === this.props.contractor.id
                  ? "Congrats You Won!"
                  : "Bidding Is Now Over "}{" "}
              </h1>
            ) : (
              <h3>
                {myBid
                  ? `Your current bid is $${myBid.price}`
                  : "You Havent Bid Yet, Bid now!"}
              </h3>
            )}
            <Card.Header></Card.Header>
            <Card.Meta>
              {/* {bid.status ? `Winning Bid Was $${bid.price}` : null} */}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            {!bid.status ? (
              <div className="ui two buttons">
                <BidModal
                  makeABid={this.props.makeABid}
                  contractor={this.props.contractor}
                  task={this.props.currentTask}
                  updateCurrentTask={this.props.updateCurrentTask}
                />
                {myBid ? (
                  <Button
                    basic
                    color="red"
                    onClick={event =>
                      this.props.contractorDeleteBid(
                        event,
                        myBid.id,
                        this.props.contractor
                      )
                    }
                  >
                    Delete Bid
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Card.Content>
        </Card>
      </Card.Group>
    ) : (
      <Card.Group>
        <Card>
          <Card.Content>
            <h3>
              {myBid
                ? `Your current bid is $${myBid.price}`
                : "You Havent Bid, Bid now!"}
            </h3>

            <Card.Header></Card.Header>
            <Card.Meta>
              {/* {bid.status ? `Winning Bid Was $${bid.price}` : null} */}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <BidModal
                makeABid={this.props.makeABid}
                contractor={this.props.contractor}
                task={this.props.currentTask}
                updateCurrentTask={this.props.updateCurrentTask}
              />
              {myBid ? (
                <Button
                  basic
                  color="red"
                  onClick={event =>
                    this.props.contractorDeleteBid(
                      event,
                      myBid.id,
                      this.props.contractor
                    )
                  }
                >
                  Delete Bid
                </Button>
              ) : null}
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  };

  showBid = () => {
    let contBid;
    let bid;
    if (this.props.currentTask.task_done) {
      bid = this.props.currentTask.bids.find(bid => bid.status === true);
    } else {
      bid = this.props.sortedBid;
      contBid = this.props.contractor.bids.find(
        bid => bid.task.id === this.props.currentTask.id
      );

      if (bid && contBid) {
        bid = bid.price < contBid.price ? bid : contBid;
      }
    }

    return bid ? bid.price : 0;
  };

  yourBid = () => {
    let myBid;
    if (this.props.sortedBid) {
      this.props.currentTask.bids
        ? (myBid = this.props.contractor.bids.find(
            bid => bid.task.id === this.props.currentTask.id
          ))
        : (myBid = null);
      if (myBid) {
        return this.props.sortedBid.price > myBid.price
          ? `Congrats You Have The Current Lowest Bid Of $${this.showBid()}`
          : `Lowest Current Bid: $${this.showBid()}`;
      }
    }
  };

  render() {
    return (
      <div>
        <Link to="/profile"> </Link>
        <h1>
          Title:{" "}
          <h3>
            <strong>{this.props.currentTask.name}</strong>
          </h3>{" "}
        </h1>
        <h1>
          Description: <h3>{this.props.currentTask.description}</h3>{" "}
        </h1>
        <div>
          {this.props.currentTask.task_done ? (
            <h1> Winning Bid: ${this.showBid()}</h1>
          ) : (
            <h3>{this.yourBid()}</h3>
          )}
          {/* <h1>Lowest Current Bid: ${this.props.sortedBid ? this.props.sortedBid.price: null}</h1> */}
        </div>

        <div className="bids">{this.CardExampleGroups()}</div>
      </div>
    );
  }
}
