import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo, userLogout } from '../../duck/reducer';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from './navbar.scss'

class NavBar extends Component {
  constructor(props) {
    super(props);

  }

  handleLogOut = () => {
    this.notify(1)
    this.props.userLogout()
  }

  ////  notify message 
  notify = (number) => {
    // console.log(number);
    switch(number) {
      case 1:
      return toast.success(`Logout Success ^.^ `, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  render() {
    return (
      <div className='navbarBox'>
        <div className='profileBox'>
          <img src={ this.props.userReducer.profile_picture }></img>
          <p>{ this.props.userReducer.username }</p>
        </div>
        <Link to='/dashboard'>
          <button className='button1'>
            <i className='fas fa-home'></i>
          </button>
        </Link>
        <Link to='/new'>
          <button className='button1'>
            <i className='fa fa-plus-circle'></i>
          </button>
        </Link>
        <Link to='/account'>
          <button className='button1'>
            <i className="fas fa-cogs"></i>
          </button>
        </Link>
        <Link to='/'>
          <button className='button2' onClick={ () => this.handleLogOut() }>
            <i className='fas fa-sign-out-alt'></i>
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

export default connect(mapStateToProps, { getUserInfo, userLogout })(NavBar);