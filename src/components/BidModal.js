import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Make A Bid</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        color="blue"
        size='small'
      >
        <Header icon='money' content='Please Place A bid' />
        <Modal.Content>
        <div class="ui label label">$</div>
          <Input type='number' step="1" placeholder='In Full Dollars $'/>
          <div >Rounded To Nearest Dollar</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Submit Bid
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}