import React, { Component } from 'react';
import NavBar from '../navBar/NavBar';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
     };
  }

  componentDidMount() {
    console.log(this.props.match.params.postId);

    fetch(`${ SERVER_URL_ENDPOINT }/api/getSinglePostById/${ this.props.match.params.postId }`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      this.setState({ posts: response })
    })
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));


  }
  render() {
    let { posts } = this.state;

    let displaySinglePosts = posts.map((value, index) => {
      console.log(value, index);
      return(
          <div key={ value.post_id }>
            <p>Title: { value.post_title }</p>
            <p>userName: { value.user_username }</p>
            <img src={ value.user_profile_pic } alt={ value.user_username }></img>
            <img src={ value.post_img } alt={ value.post_img }></img>
            <p>post_content: { value.post_content }</p>
          </div>
      )
    });
    return (
      <div>
        <NavBar/>
        Posts Component
        { displaySinglePosts }
      </div>
    );
  }
}

export default Post;