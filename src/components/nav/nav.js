import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const navBar = (props) => {
  console.log(props.userReducer);
  // console.log(this.props);
  return(
    <div>
      navBar component
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <Link to='/new'>
        <button>Form</button>
      </Link>
      <Link to='/'>
        <button>Logout</button>
      </Link>
      <div>
        <p>Placeholder for now:</p>
        <p>Name: { props.userReducer.username }</p>
        <img src={ props.userReducer.profile_picture }></img>
      </div>
    </div>
  )
}


//// def props type
navBar.propTypes = {
  userReducer: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    profile_picture: PropTypes.string
  })
}

function mapStateToProps(state) {
  console.log(state);
  return state;
}

export default connect(mapStateToProps, {  })(navBar);