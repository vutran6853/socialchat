import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import css from './dashboard.scss';

const SERVER_URL_ENDPOINT = 'http://localhost:3005';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      searchItem: '',
      userposts: true,
     };
  }
  
  componentDidMount() {
    this.handleGetPost()
    // this.notify()
  }

  ////  reset search input field function
  handleInputSearchItem = (value) => {
    this.setState({ searchItem: value })
  }

  ////  Get all post By search || nonsearch
  handleGetPost = () => {
    let { id } = this.props.userReducer;
    let { userposts, searchItem } = this.state;

    ////  If userposts is true AND there is a search string
    if(userposts === true && searchItem !== '') {
      fetch(`${ SERVER_URL_ENDPOINT }/api/getAllPostBySearch/${ id }?userposts=${ userposts }&searchItem=${ searchItem }`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({ posts: response })
        // this.props.history.push('/dashboard')
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));

      //// If userposts is false AND there is no search string
    } else if(!userposts === false && searchItem == '') {
      fetch(`${ SERVER_URL_ENDPOINT }/api/getAllPostByNoSeach/${ id }?userposts=${ userposts }&searchItem=${ searchItem }`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({ posts: response })
        // this.props.history.push('/dashboard')
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));

    } else {
      console.log(false);
    }

  }

  handleReset = () => {
    console.log('handleReset');
  }

  handleViewPost = (postID) => {
    console.log('postID::', postID);
  }

  render() {
    let { posts } = this.state;

    let displayPosts = posts.map((value, index) => {
      // console.log(value, index);
      return(
        <Link to={ `post/${ value.post_id }` } key={ value.post_id }>
          <div key={ value.post_id }  className='dashboardPostBox'>
            <img src={ value.user_profile_pic } className='UserProfilePic'  alt={ value.user_username }></img>
            <img src={ value.post_img } className='previewPostImage'></img>
            <p className='titleP'>Title: { value.post_title }</p>
            <p className='usernameP'>By: { value.user_username }</p>
          </div>
        </Link>
      )
    });

    return (
      <div className='dashboardbox'>
        <NavBar/>
        <ToastContainer autoClose={ 3000 } />
          <div className='innerdashboardbox'>
            <div className='dashboard_search_box'>
              <input onChange={ (e) => this.handleInputSearchItem(e.target.value) } placeholder='Search By Title'></input>
              <button onClick={ () =>  this.handleGetPost() }>
                <i className='fas fa-search'></i>
              </button>  
              <button onClick={ () =>  this.handleReset() }>
                <i className='fas fa-undo'></i>
              </button>
            </div>
            <div>
              { displayPosts }
            </div>
          </div>
      </div>
    );
  }
}

//// def props type
Dashboard.propTypes = {
  userReducer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
  })
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  }) (Dashboard);