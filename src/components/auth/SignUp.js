import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../duck/reducer';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import css from './auth.scss';

class SignUp extends Component {
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

  handleLogin(e) {
    e.preventDefault();
    this.props.history.push('/')
  }

  ////  notify message 
  notify = (number, username) => {
    switch(number) {
      case 3: 
      return toast.error('Please enter username and password', {
             position: toast.POSITION.TOP_RIGHT,
      });
      case 3.5: 
      return toast.error('Username is already taken. Try again', {
        position: toast.POSITION.TOP_RIGHT,
      });
      case 4:
      return toast.success(`Welcome ${ username }`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  //// Register user profile
  handleRegister = (e) => {
    e.preventDefault();

    if(this.state.username !== '' && this.state.password !== '') {
     let content = { userName: this.state.username, passWord: this.state.password }

      // axios.post('/api/auth/register', { userName: this.state.username, passWord: this.state.password })
      fetch(`${ process.env.REACT_APP_SERVER_URL_REGISTER }`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.name === 'error') {
          this.notify(3.5)
        } else {
          this.props.getUserInfo(response[0].user_id, response[0].user_username, response[0].user_profile_pic)
          // this.props.getUpdateUserInfo(response.data[0].user_id, response.data[0].user_username, response.data[0].user_profile_pic )
          this.props.history.push('/dashboard')
          this.notify(4, response[0].user_username)
        }
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`))
    } else {
      this.notify(3)
    }
  }

  render() {
    return (
      <div className='authMainBox'>
        <ToastContainer autoClose={ 3000 } />
        <form>
          <div className='formBox signUpForm'>
            <h3>Create a New Account</h3>
            <br/>
            <h3>UserName</h3>
            <input onChange={ (e) => this.handleInputUserName(e.target.value, 'username') } placeholder='Enter your username'></input>
            
            <h3>Password</h3>
            <input onChange={ (e) => this.handleInputUserPassword(e.target.value, 'passwordname') } type='password' placeholder='Enter your password'></input>
            
            <br/>
            <button onClick={ (e) => this.handleRegister(e) }>Register</button>
            <button onClick={ (e) =>  this.handleLogin(e) }>Have an account?</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { getUserInfo })(SignUp);