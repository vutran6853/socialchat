import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './form.scss';
import NavBar from '../navBar/NavBar';
import noIMage from '../../image/No_Image_Available.jpg';
import ProfilePage from '../ProfilePage';

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
      fetch(`${ SERVER_URL_ENDPOINT }/api/post/${ id }`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents)
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.props.history.push('/dashboard')
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
    } else {
      console.log('placeholder for pop up message enter enter');
    }


  }

  handleInputForm = (event) => {
    // console.log(event.target.name, ': ', event.target.value)
    this.setState({ [event.target.name]: event.target.value})
  }

  handleGetUrlFromImage = (value) => {
    console.log('value::', value);
  } 

  render() {
    // console.log('Form props', this.props.userReducer)
    // console.log(this.props.userReducer.urlImage);
    let imgSrc = this.state.imageUrl ? this.state.imageUrl : noIMage;
    return (
      <div className='formBox'>
        <NavBar/>

          <div className='innerFormBox'>
            <h3>New Post</h3>
            <div className='innerFormInputBox'>
              <p>Title:</p>
              <input name='title' onChange={ this.handleInputForm } placeholder='title'></input>
              <br/>

              {/* <p>Image Url:</p> */}
                <ProfilePage data={ this.handleGetUrlFromImage }/>
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

export default connect(mapStateToProps, {  }) (Form);