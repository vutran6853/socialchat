import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './form.scss';
import NavBar from '../navBar/NavBar';
import noIMage from '../../image/No_Image_Available.jpg';
import ImagePostUploader from './ImagePostUploader';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      imageUrl: '',
      content: '',
      urlImageData: '',
     }
  }

  handleSubmitPost = () => {
    let { id } = this.props.userReducer;
    let contents = { title: this.state.title, 
                     imageUrl: this.props.userReducer.urlImage, 
                     content: this.state.content }
    
    if(contents.title !== '' && contents.content !== '') {
      // axios.post(`/api/post/${ id }`, { title: this.state.title, 
      //   imageUrl: this.props.userReducer.urlImage, 
      //   content: this.state.content })
      fetch(`${ process.env.REACT_APP_SERVER_URL_SUBMITPOST }/${ id }`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents)
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.notify(1)
        this.props.history.push('/dashboard')
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
    } else {
      this.notify(1.5)
    }
  }

  handleInputForm = (event) => {
    // console.log(event.target.name, ': ', event.target.value)
    this.setState({ [event.target.name]: event.target.value})
  }

  handleGetUrlFromImage = (value) => {
    console.log('value::', value);
  } 

  ////  notify message 
  notify = (number) => {
    // console.log(number);
    switch(number) {
      case 1:
      return toast.success(`Post Success ^.^ `, {
        position: toast.POSITION.TOP_RIGHT,
      });
      case 1.5:
      return toast.error(`Post was unsuccess`, {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
  }

  render() {
    let imgSrc = this.state.imageUrl ? this.state.imageUrl : noIMage;

    return (
      <div className='formBox'>
        <NavBar/>
        <ToastContainer autoClose={ 3000 } />
          <div className='innerFormBox'>
            <h3>New Post</h3>
            <div className='innerFormInputBox'>
              <p>Title:</p>
              <input name='title' onChange={ this.handleInputForm } placeholder='title'></input>
              <br/>
              <ImagePostUploader data={ this.handleGetUrlFromImage }/>
              <br/>
              <p>Content:</p>
              <textarea name='content' onChange={ this.handleInputForm } placeholder='content'></textarea>
              <br/>
              <button onClick={ () =>  this.handleSubmitPost() }>Post</button>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  })(Form);