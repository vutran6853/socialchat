import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './form.scss';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      imageUrl: '',
      content: '',
     }
  }

  handleSubmitPost = () => {
    let { id } = this.props.userReducer;
    let contents = { title: this.state.title, 
                    imageUrl: this.state.imageUrl, 
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

  render() {
    // console.log('Form props', this.props.userReducer)
    return (
      <div>
        Form Component
        <input name='title' onChange={ this.handleInputForm } placeholder='title'></input>
        <input name='imageUrl' onChange={ this.handleInputForm } placeholder='imageUrl'></input>
        <input name='content' onChange={ this.handleInputForm } placeholder='content'></input>

        <button onClick={ () =>  this.handleSubmitPost() }>Search</button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  }) (Form);