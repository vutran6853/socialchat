import React, { Component } from 'react';
import NavBar from '../navBar/NavBar';
import { connect } from 'react-redux';
import ImageAccountUploader from './ImageAccountUploader';
import { editUserName, getUserInfo, getUpdateUserInfo } from '../../duck/reducer';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from './account.scss';

import axios from 'axios';


function EditUserName(props) {
  // console.log(props);
  if(!props.data.editAccount) {
    return(
      <input type='text' name='username' 
             placeholder={ props.props.userReducer.username }
             onChange={ (e) => props.editUserName(e.target.value) } 
             onKeyPress={ (e) => props.postUserName(e.key) } 
             >
      </input>
    )
  } else {
    return null
  }
 
}
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editAccount: true,
      newUsername: '',
      newUserPassword: '',
      imageUrl: '',
      urlImageData: '',
      userEmail: '',
     };
  }

  handleEdit = () => {
    this.setState({ editAccount: !this.state.editAccount })
  }

  handleUserEmail = (value) => {
    this.setState({ userEmail: value })
  }

  handleEditUserName = (value) => {
    this.setState({ newUsername: value })
  }

  handleEditUserPassword = (value) => {
    this.setState({ newUserPassword: value })
  }

  handlePostUserEmail = (keyCode) => {
    let { userEmail } = this.state;
    if(keyCode === 'Enter') {

      if(userEmail.includes('@')) {

        axios.put('/api/postUserEmail', { id: this.props.userReducer.id, email: userEmail })
        .then((response) => {
          // console.log(response)
          this.props.getUpdateUserInfo(response.data[0].user_id, response.data[0].user_username, response.data[0].user_profile_pic, response.data[0].user_email )
          this.notify(2.5)
          this.setState({ userEmail: '' })
        })
        .catch((error) => console.log('What happen here?', error));

      } else {
        this.notify(2)
      }

    } else {
      return null
    }
  }

  handlePostUserPassword= (keyCode) => {
    let { newUserPassword } = this.state;
    if(keyCode === 'Enter') {

        axios.put('/api/postUserPassword', { id: this.props.userReducer.id, password: newUserPassword })
        .then((response) => {
          console.log(response)
          if(response.status === 200) {
            console.log(true);
            this.notify(3.5)
            this.setState({ newUserPassword: '' })
          } else {
            this.notify(3)
          }
        })
        .catch((error) => console.log('What happen here?', error));


    } else {
      return null
    }
  }

  handlePostNewUserName = (keyCode) => {
    if(keyCode === 'Enter') {
      this.props.editUserName(this.props.userReducer.id, this.state.newUsername)
      .then((response) => {
        // console.log(response.value.data)
          this.props.getUserInfo(response.value.data[0].user_id, response.value.data[0].user_username, response.value.data[0].user_profile_pic)
          this.setState({ editAccount: true })
          this.notify(1.5)
      })
      .catch((error) => {
        if(error) {
          this.notify(1)
        }
      });
    } else {

    }
  }

    ////  notify message 
    notify = (number) => {
      switch(number) {
        case 1: 
        return toast.error('Username is already taken. Try again', {
          position: toast.POSITION.TOP_RIGHT,
        });
        case 1.5:
        return toast.success('Username updated ^.^ ', {
          position: toast.POSITION.TOP_RIGHT,
        });
        case 2:
        return toast.error('Invalid Email. Try again', {
          position: toast.POSITION.TOP_RIGHT,
        });
        case 2.5:
        return toast.error('Email updated ^.^ ', {
          position: toast.POSITION.TOP_RIGHT,
        });
        case 3:
        return toast.error('Something went wrong. Please try later', {
          position: toast.POSITION.TOP_RIGHT,
        });
        case 3.5:
        return toast.success('Password updated ^.^ ', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

  render() {
    // console.log('props', this.props.userReducer);
    return (
      <div className='accountBox'>
        <NavBar/>
        <h3>Account Setting</h3>
        <ToastContainer autoClose={ 3000 } />
        <div className='accountFormBox'>
          <p><strong>username:</strong> { this.props.userReducer.username }</p>
          <button onClick={ () => this.handleEdit() }>edit</button> 
          <EditUserName data={ this.state } 
                        props={ this.props }
                        editUserName={ this.handleEditUserName }
                        postUserName={ this.handlePostNewUserName }
                        />
          <br/>
          <br/>
          <p><strong>Change Profile Pictue:</strong></p>
          <img src={ this.props.userReducer.profile_picture } alt={ this.props.userReducer.username }></img>
          <ImageAccountUploader/>
          <br/>
          <p><strong>Email: </strong>{ this.props.userReducer.userEmail ? this.props.userReducer.userEmail : '' }</p>
          <input type='email'
                 className='emailInput'
                 value={ this.state.userEmail }
                 placeholder='Enter new Email'
                 onChange={ (e) => this.handleUserEmail(e.target.value) } 
                 onKeyPress={ (e) => this.handlePostUserEmail(e.key) }>
          </input>
          <br/>
          <p><strong>New Password:</strong></p>
          <input type='password'
                 className='passwordInput'
                 placeholder='Enter new password'
                 value={ this.state.newUserPassword }
                 onChange={ (e) => this.handleEditUserPassword(e.target.value) } 
                 onKeyPress={ (e) => this.handlePostUserPassword(e.key) }>
          </input>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { editUserName, getUserInfo, getUpdateUserInfo }) (Account);