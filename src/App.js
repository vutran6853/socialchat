import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import Form from './components/form/Form';
import Post from './components/post/Post';
import Nav from './components/nav/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Dashboard/>
        <Auth/>
        <Form/>
        <Post/>
      </div>
    );
  }
}

export default App;
