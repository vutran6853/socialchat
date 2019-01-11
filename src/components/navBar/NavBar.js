import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo } from '../../duck/reducer';
import Axios from 'axios';
import css from './navbar.scss'
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount() {




  }
  
  render() {
    return (
      <div>
        NavBar component
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <Link to='/new'>
        <button>Form</button>
      </Link>
      <Link to='/'>
        <button >Logout</button>
      </Link>
      <div>
        <p>Placeholder for now:</p>
        <p>ID: { this.props.userReducer.id }</p>
        <p>Name: { this.props.userReducer.username }</p>
        <img src={ this.props.userReducer.profile_picture }></img>
      </div>
    </div>
    );
  }
}

//// def props type
NavBar.propTypes = {
  userReducer: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    profile_picture: PropTypes.string
  })
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUserInfo })(NavBar);