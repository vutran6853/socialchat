import React, { Component } from 'react';
import Navbar from '../navBar/NavBar';
import { connect } from 'react-redux';
import css from './dashboard.scss';
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      searchItem: '',
      userposts: true,

     };
  }
  
  ////  get all post from database function
  componentDidMount() {
    this.handleGetPost()
  }

  ////  reset search input field function
  handleInputSearchItem = (value) => {
    this.setState({ searchItem: value })
  }

  handleGetPost = () => {
    let { id } = this.props.userReducer;
    let { userposts, searchItem } = this.state;

    ////  If userposts is true AND there is a search string
    if(userposts === true && searchItem !== '') {
      // console.log(true);

      fetch(`${ SERVER_URL_ENDPOINT }/api/getAllPostBySearch/${ id }?userposts=${ userposts }&searchItem=${ searchItem }`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ posts: response })
        // this.props.history.push('/dashboard')
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));

      //// If userposts is false AND there is no search string
    } else if(!userposts === false && searchItem == '') {
      // console.log(true);

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
        <Link to={ `post/${ value.post_id }` }>
          <div key={ value.post_id }  className='dashboardPostBox'>
            <img src={ value.user_profile_pic }  alt={ value.user_username }></img>
            <p className='titleP'>Title: { value.post_title }</p>
            <p className='usernameP'>By: { value.user_username }</p>
          </div>
        </Link>

      )
    });

    return (
      <div className='dashboardbox'>
        <NavBar/>
          <div className='innerdashboardbox'>
            <div className='dashboard_search_box'>
              <input onChange={ (e) => this.handleInputSearchItem(e.target.value) } placeholder='Search item'></input>
              <button onClick={ () =>  this.handleGetPost() }>
                <i class='fas fa-search'></i>
              </button>  
              <button onClick={ () =>  this.handleReset() }>
                <i class='fas fa-undo'></i>
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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  }) (Dashboard);