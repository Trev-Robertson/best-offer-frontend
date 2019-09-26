import React from "react";
import { Button, Comment, Form, Header, Rating, Card } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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

  render() {
    console.log(this.props.contractor);
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="bids">
          <Card
            image={`https://randomuser.me/api/portraits/${
              ["women", "men"][Math.floor(Math.random() * 2)]
            }/${Math.floor(Math.random() * 99)}.jpg`}
            header={this.props.contractor.name}
            meta={`My Specialties Are ${this.props.contractor.specialties[0].name[0].toUpperCase() +
              this.props.contractor.specialties[0].name.slice(1)} 
    and ${this.props.contractor.specialties[1].name[0].toUpperCase() +
      this.props.contractor.specialties[1].name.slice(1)}`}
            description={`A professional with ${Math.floor(Math.random() * 30) +
              2} years of experience`}
            extra={"Check my great reviews!!!!"}
          />
            <div>
          <Comment.Group>
            <ReviewForm
              addNewReview={this.props.addNewReview}
              contractor={this.props.contractor}
            />
            {this.props.contractor.reviews
              .reverse()
              .map(review => this.CommentExampleComment(review))}
          </Comment.Group>
              </div>
        </div>
      </div>
    );
  }
}
