import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../duck/reducer';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
     }
     this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputUserName = (value) => {
   this.setState({ username: value })
  }

  handleInputUserPassword = (value) => {
    this.setState({ password: value })
  }

  handleLogin() {
    let content = { userName: this.state.username, passWord: this.state.password }

    fetch(`${ SERVER_URL_ENDPOINT }/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then((response) => response.json())
    .then((response) => {
      // if(response[0] !== undefined) {
        console.log('response[0]', response[0]);
        console.log(this.props);
        this.props.getUserInfo(response[0].user_id, response[0].user_username, response[0].user_profile_pic )
        this.props.history.push('/dashboard')
        
      // } else {
        // console.log('undefined', undefined);
      // }
    })
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
  }

  handleRegister = () => {
    let content = { userName: this.state.username, passWord: this.state.password }

    fetch(`${ SERVER_URL_ENDPOINT }/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then((response) => response.json())
    .then(this.props.history.push('/dashboard'))
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`))
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        Auth Component
        <input onChange={ (e) => this.handleInputUserName(e.target.value, 'username') } placeholder='Enter your username'></input>
        <input onChange={ (e) => this.handleInputUserPassword(e.target.value, 'passwordname') } placeholder='Enter your password'></input>
        <button onClick={ () =>  this.handleLogin() }>login</button>
        <button onClick={ () => this.handleRegister() }>Register</button>
      </div>
    );
  }
}

export default connect(null, { getUserInfo }) (Auth);