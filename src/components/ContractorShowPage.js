import React from "react";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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
          <div>{review.created_at.split('T')[0]}</div>
        </Comment.Metadata>
        <Comment.Text>{review.content}</Comment.Text>
        {/* <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions> */}
      </Comment.Content>
    </Comment>
  };



  render() {
    
    return (
      <div >
        <br/>
        <br/>
        <br/>
        <div className='bids'>
        <Comment.Group>
          <Header as="h3" dividing>
            Reviews
          </Header>
          {this.props.contractor.reviews.map(review => this.CommentExampleComment(review))}
          -----------------------------------------
          <Form reply onSubmit={(event) => this.props.addNewReview(event, this.state.rating, this.props.contractor)}>
          <Rating icon='star' name='rating' maxRating={5} onRate={this.handleRate} size='massive'  />
            <Form.TextArea name='content' />
            <Button
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
