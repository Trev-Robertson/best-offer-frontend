import React from 'react';
import store from '../redux/store'
import Profile from '../components/profile'


export default class ProfileContainer extends React.Component {
    render(){

    return(
        <div className='columns'>
            <div className='column' style={{justifyContent: 'flex-end'}}>
              <Profile users={this.props.users}/>
            </div>
        </div>
    )
    }
}

