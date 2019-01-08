import React, { Component } from 'react';
import Navbar from '../nav/nav';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      searchItem: '',
      userposts: true,

     };
  }
  
  ////  get all post from database function

  ////  reset search input field function
  handleInputSearchItem = (value) => {
    this.setState({ searchItem: value })
  }

  handleSearch = () => {
    console.log('handleSearch');
  }

  handleReset = () => {
    console.log('handleReset');
  }

  render() {
    console.log(this.state);
    return (
      <div>
        Dashboard Component
        <input onChange={ (e) => this.handleInputSearchItem(e.target.value) } placeholder='Search item'></input>

        <button onClick={ () =>  this.handleSearch() }>Search</button>
        <button onClick={ () =>  this.handleReset() }>Reset</button>
      </div>
    );
  }
}

export default Dashboard;