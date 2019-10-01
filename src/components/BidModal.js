import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = (event) => {
      console.log('close modal')
      this.setState({ modalOpen: false })}

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <Modal
        trigger={<Button  basic
            color="blue"onClick={this.handleOpen}>Make A Bid</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        color="blue"
        size='small'
      >
        <Header icon='money' content='Please Place A bid' />
        <Modal.Content>
        <div class="ui label label">$</div>
          <Input type='number' min='0' max='1000000' name='bid-amount' step="1" placeholder='In Full Dollars $' onChange={this.handleChange}/>
          <div >Rounded To Nearest Dollar</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={(event) => {this.handleClose(event); this.props.makeABid(event, this.state, this.props.contractor, this.props.task)}} inverted>
            <Icon name='checkmark' /> Submit Bid
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}