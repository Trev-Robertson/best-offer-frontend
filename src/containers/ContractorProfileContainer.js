import React from "react";
// import store from '../redux/store'
import ContractorProfile from '../components/ContractorProfile'

export default class ContractorProfileContainer extends React.Component {
  state = {};

  render() {
    
    return (
      <div>
        <ContractorProfile contractor={this.props.contractor}/>
      </div>
    );
  }
}
