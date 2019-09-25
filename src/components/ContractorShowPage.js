import React from "react";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ReviewForm from './ReviewForm'

export default class ContractorShowPage extends React.Component {
  state = { rating: 3 }

  handleRate = (e, { rating, maxRating }) =>{
  this.setState({
    rating: rating
  })
  }

  CommentExampleComment = (review) => {
 

    return <Comment key={review.id}>
      <Comment.Avatar src="https://thispersondoesnotexist.com/image" />
      <Comment.Content>
        <Comment.Author as="a">{review.user.name}</Comment.Author>
        <Comment.Metadata>
          <div>{review.created_at.split('T')[0]}     <Rating icon='star' rating={review.stars} /></div>
        </Comment.Metadata>
        <Comment.Text>{review.content}</Comment.Text>
        {/* <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions> */}
      </Comment.Content>
    </Comment>
  };


  averageStars = () =>{
 
    
   let sum = this.props.contractor.reviews.reduce((a, b) => ({stars: a.stars + b.stars})).stars
    
   let avg = sum/this.props.contractor.reviews.length
   return avg.toFixed(2)
  }


  render() {
    
    return (
      <div >
        <br/>
        <br/>
        <br/>
        <div className='bids'>
        <Comment.Group>
        <ReviewForm addNewReview={this.props.addNewReview} contractor={this.props.contractor}/>
             
              {this.props.contractor.reviews.reverse().map(review => this.CommentExampleComment(review))}
        </Comment.Group>
        </div>
      </div>
    );
  }
}
