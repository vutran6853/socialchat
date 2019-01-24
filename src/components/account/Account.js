import React, { Component } from 'react';
import NavBar from '../navBar/NavBar';
import { connect } from 'react-redux';
import ImageAccountUploader from './ImageAccountUploader';
import { editUserName, getUserInfo } from '../../duck/reducer';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
      imageUrl: '',
      urlImageData: '',
     };
  }

  handleEdit = () => {
    this.setState({ editAccount: !this.state.editAccount })
  }

  handleSubmit = (e) => {
    e.preventdefault()
  }

  handleEditUserName = (value) => {
    this.setState({ newUsername: value })
  }

  handlePostNewUserName = (keyCode) => {
    if(keyCode === 'Enter') {
      this.props.editUserName(this.props.userReducer.id, this.state.newUsername)
      .then((response) => {
        // console.log(response.value.data);
          this.props.getUserInfo(response.value.data[0].user_id, response.value.data[0].user_username, response.value.data[0].user_profile_pic)
          this.setState({ editAccount: true })
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
      }
    }

  render() {
    // console.log('props', this.props.userReducer);
    return (
      <div>
        <NavBar/>
        <ToastContainer autoClose={ 3000 } />
        <p>Account Components</p>

           username: { this.props.userReducer.username } 
           <button onClick={ () => this.handleEdit() }>edit</button> 
          <EditUserName data={ this.state } 
                        props={ this.props }
                        editUserName={ this.handleEditUserName }
                        postUserName={ this.handlePostNewUserName }
                        />
          <br/>
          <br/>
          Change Profile Pictue:
          <img src={ this.props.userReducer.profile_picture } alt={ this.props.userReducer.username }></img>
          <ImageAccountUploader/>
          <br/>
          {/* <input type="submit" value="Submit" onClick={ () => this.handleSubmit() }></input> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { editUserName, getUserInfo }) (Account);