import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      search: '',
      userposts: true,

     };
  }
  
  ////  get all post from database function

  ////  reset search input field function
  

  render() {
    return (
      <div>
        Dashboard Component
      </div>
    );
  }
}

export default Dashboard;