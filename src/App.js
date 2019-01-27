import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            { routes }
        </div>
    );
  }
}

export default App;
