import React, { Component } from 'react';
import NavBar from '../navBar/NavBar';
import Comments from './Comments';
import css from './post.scss';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      countThumbsUp: 1,
      countThumbsDown: 2,
      isClickComment: false,
     };
  }

  componentDidMount() {
    // console.log(this.props.match.params.postId);

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

  handleLikeOrDislikeThumb = (number) => {
    // console.log('number', number);
    if(number === 1) {
      this.setState({ countThumbsUp: this.state.countThumbsUp + 1 })
    } else {
      this.setState({ countThumbsDown: this.state.countThumbsDown + 1 })
    }
  }

  render() {
    let { posts } = this.state;
    
    let displaySinglePosts = posts.map((value, index) => {
      // console.log(value, index);
      return(
          <div key={ value.post_id } className='innerPostBox'>
            <div className='profileBox'>
              <img src={ value.user_profile_pic } alt={ value.user_username }></img>
              <p>Name: { value.user_username }</p>
            </div>
            <div className='innerPostImageBox'>
              <p>Title: { value.post_title }</p>
              <img src={ value.post_img } alt={ value.post_img }></img>
              <p>post_content: { value.post_content }</p>
            </div>
            <div className='innderPostFeedback'>
              <button onClick={ () => this.handleLikeOrDislikeThumb(1) } className='onHoverEffect'>
                <span>Like { this.state.countThumbsUp }</span>
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button onClick={ () => this.handleLikeOrDislikeThumb(2) } className='onHoverEffect'>
                <span>Dislike { this.state.countThumbsDown }</span>
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
            <Comments data={ value }/>

          </div>
      )
    });

    return (
      <div className='postViewBox'>
        <NavBar/>
        { displaySinglePosts }
        {/* { displayComment } */}
      </div>
    );
  }
}

export default Post;