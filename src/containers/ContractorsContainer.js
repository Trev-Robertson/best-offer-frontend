import React from "react";
import ContractorShowPage from "../components/ContractorShowPage";
import { Card } from "semantic-ui-react";
import { isEmpty } from "lodash";
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route
} from "react-router-dom";

const URL = "https://best-offer-backend.herokuapp.com/contractors";
const REVIEWSURL = "https://best-offer-backend.herokuapp.com/reviews";

export default class ContractorsContainer extends React.Component {
  state = {
    allContractors: [],
    profileSelected: [],
    newReview: true
  };

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(allContractors => {
        this.setState({ allContractors });
      });
  }

  extra = contractor => {
    return this.state.allContractors ? (
      <h3>{`My Specialties Are ${contractor.specialties[0].name[0].toUpperCase() +
        contractor.specialties[0].name.slice(1)} 
       and ${contractor.specialties[1].name[0].toUpperCase() +
         contractor.specialties[1].name.slice(1)}`}</h3>
    ) : null;
  };

  addNewReview = (event, rating, contractor) => {
    event.preventDefault();
    let data = {
      user_id: this.props.user.id,
      contractor_id: contractor.id,
      stars: rating,
      content: event.target.content.value
    };

    fetch(REVIEWSURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(newContractor => {
        let updateContractor = this.state.allContractors.map(contractor =>
          contractor.id === newContractor.id ? newContractor : contractor
        );

        this.setState({
          allContractors: updateContractor
        });
      });

    event.target.reset();
  };

  CardExampleLinkCard = contractor => {
    return (
      <Card
        key={contractor.id}
        image={contractor.img_url}
        color="blue"
        href={`/contractors/${contractor.id}`}
        header={contractor.name}
        meta={""}
        description={`Pick me if you want the job done right!`}
        extra={this.extra(contractor)}
      />
    );
  };

  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          render={props => {
            let contractorObj = this.state.allContractors.find(
              task => task.id == props.match.params.id
            );

            return !isEmpty(contractorObj) ? (
              <ContractorShowPage
                contractor={contractorObj}
                addNewReview={this.addNewReview}
                user={this.props.user}
              />
            ) : null;
          }}
        />

        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => (
            <div className="contractor-display">
              <Card.Group itemsPerRow={6}>
                {this.state.allContractors.map(contractor => {
                  return this.CardExampleLinkCard(contractor);
                })}
              </Card.Group>
            </div>
          )}
        />
      </div>
    );
  }
}
