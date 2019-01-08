import React, { Component } from 'react';

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
    console.log('handleSubmitPost');
  }

  handleInputForm = (event) => {
    console.log(event.target.name, ': ', event.target.value)
    this.setState({ [event.target.name]: event.target.value})
  }

  render() {
    console.log(this.state);
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

export default Form;