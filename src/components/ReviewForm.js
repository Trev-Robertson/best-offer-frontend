import React from "react";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class ReviewForm extends React.Component {
  state = { rating: 3 };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({
      rating: rating
    });
  };

  averageStars = () => {
    if (this.props.contractor.reviews.length > 0) {
      let sum = this.props.contractor.reviews.reduce((a, b) => ({
        stars: a.stars + b.stars
      })).stars;

      let avg = sum / this.props.contractor.reviews.length;
      return avg.toFixed(2);
    } else {
      return 0;
    }
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="bids">
          <Comment.Group>
            <Header as="h3" dividing>
              Please Leave a Review!
              <p> (Average Rating: {this.averageStars()}) </p>
            </Header>
            <Form
              reply
              onSubmit={event =>
                this.props.addNewReview(
                  event,
                  this.state.rating,
                  this.props.contractor
                )
              }
            >
              <Rating
                disabled={this.props.disableForm}
                icon="star"
                name="rating"
                defaultRating={0}
                maxRating={5}
                onRate={this.handleRate}
                size="massive"
              />
              <Form.TextArea name="content" disabled={this.props.disableForm} />
              <Button
                disabled={this.props.disableForm}
                content="Leave Review"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </div>
      </div>
    );
  }
}
