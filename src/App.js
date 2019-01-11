import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import Form from './components/form/Form';
import Post from './components/post/Post';
import NavBar from './components/navBar/NavBar';
import routes from './routes';
class App extends Component {
  render() {
    return (
        <div className="App">
          {/* <NavBar/> */}
            { routes }
        </div>
     
    );
  }
}

export default App;
