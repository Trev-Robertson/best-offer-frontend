import React from 'react';
import store from '../redux/store'


export default class Login extends React.Component {
    render(){
    return(
        <div>
        Login
            <form>
                <label name='name'>Name</label>
                <input name='name'></input>
                <br/>
                <label name='name'>Password</label>
                <input name='password' type='password'></input>
                <br/>
                <button>Submit</button>
            </form>
        
        </div>
    )
    }
}

