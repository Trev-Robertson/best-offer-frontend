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

  CommentExampleComment = review => {
    return (
      <Comment key={review.id}>
        <Comment.Avatar
          src={`https://randomuser.me/api/portraits/${
            ["women", "men"][Math.floor(Math.random() * 2)]
          }/${Math.floor(Math.random() * 99)}.jpg`}
        />
        <Comment.Content>
          <Comment.Author as="a">{review.user.name}</Comment.Author>
          <Comment.Metadata>
            <div>
              {review.created_at.split("T")[0]}{" "}
              <Rating icon="star" rating={review.stars} />
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

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="bids">
          <Comment.Group>
            <Header as="h3" dividing>
              Reviews
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
                icon="star"
                name="rating"
                defaultRating={1}
                maxRating={5}
                onRate={this.handleRate}
                size="massive"
              />
              <Form.TextArea name="content" disabled={true}  />
              <Button
                hidden={true}
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
