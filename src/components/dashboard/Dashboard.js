import React, { Component } from 'react';
import Navbar from '../nav/nav';
import { connect } from 'react-redux';

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
    let { id } = this.props.userReducer;
    let { userposts, searchItem } = this.state;
    console.log('userposts:', !userposts);
    console.log('searchItem:', searchItem);

    ////  If userposts is true AND there is a search string
    if(userposts === true && searchItem !== '') {
      console.log(true);

      // fetch(`${ SERVER_URL_ENDPOINT }/api/getAllPostBySearch/${ id }?userposts=${ userposts }&searchItem=${ searchItem }`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // .then((response) => response.json())
      // .then((response) => {
      //   console.log(response);
      //   // this.props.history.push('/dashboard')
      // })
      // .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));

      //// If userposts is false AND there is no search string
    } else if(userposts !== false && searchItem === '') {
      console.log(true);

      // fetch(`${ SERVER_URL_ENDPOINT }/api/getAllPost/${ id }?userposts=${ userposts }&searchItem=${ searchItem }`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // .then((response) => response.json())
      // .then((response) => {
      //   console.log(response);
      //   // this.props.history.push('/dashboard')
      // })
      // .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));


    } else {
      console.log(false);

    }

    
  }

  ////  reset search input field function
  handleInputSearchItem = (value) => {
    this.setState({ searchItem: value })
  }

  handleSearch = () => {
    console.log('handleSearch');
  }

  handleReset = () => {
    console.log('handleReset');
  }

  render() {
    console.log(this.state);
    return (
      <div>
        Dashboard Component
        <input onChange={ (e) => this.handleInputSearchItem(e.target.value) } placeholder='Search item'></input>

        <button onClick={ () =>  this.handleSearch() }>Search</button>
        <button onClick={ () =>  this.handleReset() }>Reset</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  }) (Dashboard);