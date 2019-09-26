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


    acceptedBid = () =>{
        let acceptedBid = []
      this.props.user.tasks.map(task => task.bids.map(bid => bid.status === true ? acceptedBid.push(bid) : bid))
       
      return this.props.contractor.id === acceptedBid[0].contractor_id ? true : false
    }


    doneTaskNames = () =>{
      let acceptedTask = []
      this.props.user.tasks.map(task => task.bids.map(bid => bid.status === true ? acceptedTask.push(task) : bid))
      return acceptedTask
    }

    disableForm = () => {
     let reviews =  this.props.contractor.reviews.filter(review => review.user_id === this.props.user.id)
        return reviews.length >= this.doneTaskNames().length ? true : false 
    }

    CardExampleLinkCard = task => {
      // debugger
      return <Card
       
        
        color="green"
        href={`/task/${task.id}`}
        header={task.name}
        meta={task.specialty.name[0].toUpperCase() + task.specialty.name.slice(1)}
        description={`Description: ${task.description} `}
      />
    };

  render() {
    console.log(this.props.user);
   
    return (
      <div>
       
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
          
          {this.acceptedBid() ?
              <div>
             `You accpted a bid from this contractor to complete these tasks: `
                {this.doneTaskNames().map(task => {

                 return ( 
                  
                 <div  key={Math.floor(Math.random() * 100000000000 + 1)} > 
                 {this.CardExampleLinkCard(task)}
                 </div>

                    
                 
                   
                
                )})}
              </div>
              
                       : null
                      }
          <Comment.Group>
                      <ReviewForm
                        addNewReview={this.props.addNewReview}
                        contractor={this.props.contractor}
                        disableForm={this.disableForm()}
                        />
                      {this.props.contractor.reviews.slice(0)
                        .reverse()
                        .map(review => this.CommentExampleComment(review))}
                      </Comment.Group>
          <div>
           
         
                      </div>
        </div>
      </div>
    );
  }
}


//  this.props.user.tasks.map(task=> {
//        task.bid.filter(bid => {
//              bids.status === true})})
// this.props.user.tasks.map(task => task.bids.map(bid => bid.status))