import React from "react";
import ContractorShowPage from "../components/ContractorShowPage"



const URL = 'http://localhost:3000/contractors'

export default class ContractorsContainer extends React.Component {

    state = {
 
    }


    componentDidMount(){
      fetch(URL)
      .then(res => res.json())
      .then(console.log)
    }


    render() {

        return (
          <div >
              ContractorsContainer
              

          </div>
        );
      }


}