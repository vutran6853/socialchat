import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUpdateUserInfo } from '../../duck/reducer';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from './auth.scss';
import logo from '../../image/mstile-150x150.png';

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

  ////  Login/fetching user profile
  ////  check if user in database
  handleLogin(e) {
    e.preventDefault();

    if(this.state.username !== '' && this.state.password !== '') {
      let content = { userName: this.state.username, passWord: this.state.password }

      fetch(`${ SERVER_URL_ENDPOINT }/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      .then((response) => response.json())
      .then((response) => {
        if(!response[0]) {
          this.notify(1.5)
        } else {
          this.props.getUpdateUserInfo(response[0].user_id, response[0].user_username, response[0].user_profile_pic, response[0].user_email)
          // this.props.getUpdateUserInfo(response.data[0].user_id, response.data[0].user_username, response.data[0].user_profile_pic, response.data[0].user_email )

          this.props.history.push('/dashboard')
          this.notify(3, response[0].user_username)
        }
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
    } else {
      this.notify(1)
    }
  }

  ////  notify message 
  notify = (number, username) => {
    switch(number) {
      case 1:
      return toast.error('Incorrect usename or password', {
             position: toast.POSITION.TOP_RIGHT,
      });
      case 1.5:
      return toast.warn('No user can be found. Try again', {
             position: toast.POSITION.TOP_RIGHT,
      });
      case 2:
      return toast.success(`Welcome back ${ username }`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  //// Register user profile
  handleRegister = (e) => {
    e.preventDefault();
    this.props.history.push('/signUp')
  }

  render() {
    return (
      <div className='authMainBox'>
        <ToastContainer autoClose={ 3000 } />
        <form>
          <div className='formBox'>
            <h3>Login</h3>
            <br/>
            <h3>UserName</h3>
            <input onChange={ (e) => this.handleInputUserName(e.target.value, 'username') } placeholder='Enter your username'></input>
            
            <h3>Password</h3>
            <input onChange={ (e) => this.handleInputUserPassword(e.target.value, 'passwordname') } type='password' placeholder='Enter your password'></input>
            
            <br/>
            <button onClick={ (e) =>  this.handleLogin(e) }>login</button>
            <button onClick={ (e) => this.handleRegister(e) }>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { getUpdateUserInfo })(Auth);