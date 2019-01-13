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

  render() {
    return (
      <div className='navbarBox'>
        <div className='profileBox'>
          <img src={ this.props.userReducer.profile_picture }></img>
          <p>Name: { this.props.userReducer.username }</p>
        </div>

        <Link to='/dashboard'>
          <button className='button1'>
            <i class='fas fa-home'></i>
          </button>
        </Link>

        <Link to='/new'>
          <button className='button1'>
            <i class='fa fa-plus-circle'></i>
          </button>
        </Link>

        <Link to='/'>
          <button className='button2'>
            <i class='fas fa-sign-out-alt'></i>
          </button>
        </Link>


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