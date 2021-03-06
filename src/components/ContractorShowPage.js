import React from "react";
import { Comment, Rating, Card } from "semantic-ui-react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect
// } from "react-router-dom";
import ReviewForm from "./ReviewForm";

export default class ContractorShowPage extends React.Component {
  state = { rating: 3 };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({
      rating: rating
    });
  };

  CommentExampleComment = review => {
    return (
      <Comment key={review.id}>
        <Comment.Avatar src={review.user.img_url} />
        <Comment.Content>
          <Comment.Author as="a">{review.user.name}</Comment.Author>
          <Comment.Metadata>
            <div>
              {review.created_at.split("T")[0]}{" "}
              <Rating
                icon="star"
                disabled
                rating={review.stars}
                maxRating={5}
              />
            </div>
          </Comment.Metadata>
          <Comment.Text>{review.content}</Comment.Text>
          {/* <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions> */}
        </Comment.Content>
      </Comment>
    );
  };

  averageStars = () => {
    let sum = this.props.contractor.reviews.reduce((a, b) => ({
      stars: a.stars + b.stars
    })).stars;

    let avg = sum / this.props.contractor.reviews.length;
    return avg.toFixed(2);
  };

  acceptedBid = () => {
    let acceptBid = [];
    let r = false;
    this.props.user.tasks.map(task =>
      task.bids.map(bid =>
        bid.status === true && this.props.contractor.id === bid.contractor_id
          ? acceptBid.push(bid)
          : bid
      )
    );

    if (acceptBid.length > 0) {
      this.props.contractor.id === acceptBid[0].contractor_id
        ? (r = true)
        : (r = false);
    }

    return r;
  };

  doneTaskNames = () => {
    let acceptBid = [];

    this.props.user.tasks.map(task =>
      task.bids.map(bid =>
        bid.status === true && this.props.contractor.id === bid.contractor_id
          ? acceptBid.push(task)
          : bid
      )
    );

    return acceptBid;
  };

  disableForm = () => {
    let reviews = this.props.contractor.reviews.filter(
      review => review.user_id === this.props.user.id
    );
    return reviews.length >= this.doneTaskNames().length ? true : false;
  };

  CardExampleLinkCard = task => {
    return (
      <Card
        color="green"
        href={`/task/${task.id}`}
        header={task.name}
        meta={
          task.specialty.name[0].toUpperCase() + task.specialty.name.slice(1)
        }
        description={`Description: ${task.description} `}
      />
    );
  };

  render() {
    return (
      <div>
        <br />
        <br />

        <div className="bids">
          <Card
            image={this.props.contractor.img_url}
            header={this.props.contractor.name}
            meta={`My Specialties Are ${this.props.contractor.specialties[0].name[0].toUpperCase() +
              this.props.contractor.specialties[0].name.slice(1)} 
    and ${this.props.contractor.specialties[1].name[0].toUpperCase() +
      this.props.contractor.specialties[1].name.slice(1)}`}
            description={`A professional with ${Math.floor(Math.random() * 30) +
              2} years of experience`}
            extra={"Check my great reviews!!!!"}
          />

          {this.acceptedBid() ? (
            <div>
              <h4>
                You accpted a bid from this contractor to complete these tasks:{" "}
              </h4>
              {this.doneTaskNames().map(task => {
                return (
                  <div key={Math.floor(Math.random() * 100000000000 + 1)}>
                    {this.CardExampleLinkCard(task)}
                  </div>
                );
              })}
            </div>
          ) : null}
          <Comment.Group>
            <ReviewForm
              addNewReview={this.props.addNewReview}
              contractor={this.props.contractor}
              disableForm={this.disableForm()}
            />
            {this.props.contractor.reviews.length > 0 ? (
              <h3> Reviews:</h3>
            ) : (
              <h3> No Reviews Yet</h3>
            )}
            {this.props.contractor.reviews.length > 0
              ? this.props.contractor.reviews
                  .slice(0)
                  .reverse()
                  .map(review => this.CommentExampleComment(review))
              : null}
          </Comment.Group>
          <div></div>
        </div>
      </div>
    );
  }
}
