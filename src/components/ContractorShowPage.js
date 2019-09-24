import React from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import {

  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class ContractorShowPage extends React.Component {

    state = {
 
    }




CommentExampleComment = () => (


    <Comment>
      <Comment.Avatar src='/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>



)




  render() {
    return (
      <div >
            <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
      {this.CommentExampleComment()}
    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
      </div>
    )
  }
}



