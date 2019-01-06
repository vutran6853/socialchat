import React, { Component } from 'react';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
     };
  }

  handleInputUserName = (value) => {
   this.setState({ username: value })
  }

  handleInputUserPassword = (value) => {
    this.setState({ password: value })
  }

  handleLogin = () => {
    console.log('handleLogin')
    let content = { userName: this.state.username, passWord: this.state.password }

    fetch(`${ SERVER_URL_ENDPOINT }/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`))

  }

  handleRegister = () => {
    console.log('handleRegister')
    let content = { userName: this.state.username, passWord: this.state.password }

    fetch(`${ SERVER_URL_ENDPOINT }/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then((response) => response.json())
    // .then((response) => console.log('line 48 ', response)) 
    .then(this.props.history.push('/dashboard component route later'))
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`))
  }

  render() {
    return (
      <div>
        Auth Component
        <input onChange={ (e) => this.handleInputUserName(e.target.value, 'username')  } placeholder='Enter your username'></input>
        <input onChange={ (e) => this.handleInputUserPassword(e.target.value, 'passwordname')  } placeholder='Enter your password'></input>
        <button onClick={ () =>  this.handleLogin() }>login</button>
        <button onClick={ () => this.handleRegister() }>Register</button>
      </div>
    );
  }
}

export default Auth;