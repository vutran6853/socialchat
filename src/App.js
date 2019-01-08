import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import Form from './components/form/Form';
import Post from './components/post/Post';
import Nav from './components/nav/nav';
import routes from './routes';
class App extends Component {
  render() {
    return (
        <div className="App">
          <Nav/>
            { routes }
        </div>
     
    );
  }
}

export default App;
