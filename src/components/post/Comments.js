import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import css from './post.scss';
import { lchmod } from 'fs';

const SERVER_URL_ENDPOINT = 'http://localhost:3003';

function CommentsSection(props) {
  let { commentsData } =   props.data
  // console.log('props::', props)
  if (!props.data.showComments) {
    return null
  } else {
   return commentsData.map((value, index) => {
      // console.log(value);
      return (
        <div className="commentBox">
          <div className='commentProfileBox'>
            <img src={ value.user_profile_pic } alt={ value.post_id }></img>
            <p>{ value.user_username }</p>
          </div>
          <div className='commentContextBox'>
            <p>comments: { value.comments_text }</p>
            <button className='onHoverEffect'>
              <span>Like { value.comments_likes }</span>
              <i className="fas fa-thumbs-up"></i>
            </button>
            <button className='onHoverEffect'>
              <span>Dislike { value.comments_dislike }</span>
              <i className="fas fa-thumbs-down"></i>
            </button>
          </div>
         
        </div>
      )
    });
  }
}

function UserInputComment(props) {
  console.log('props::', props)

  if (!props.data.showComments) {
    return null
  } else {
   return(
        <div className='commentProfileBox2'>
          <img src={ props.props.userReducer.profile_picture } alt={ props.props.userReducer.username }></img>
          <input value={ props.data.userInputComments } 
                 onChange={ (e) => props.userComment(e.target.value) } 
                 onKeyPress={ (e) => props.postUserComment(e.key) } 
                 placeholder='Enter comment'>
          </input>
        </div>
    )
  }
}

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      commentsData: [],
      userInputComments: '',
    }
  }

  componentDidMount() {
    console.log(this.props);
    axios.post('/api/getComments', { post_id: this.props.data.post_id })
    .then((response) => {
      // console.log(response.data);
      this.setState({ commentsData: response.data })
    })
    .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
  }

  handleToggleClick = ()  => {
    this.setState(prevState => ({
      showComments: !prevState.showComments
    }));
  }

  handleUserInputComment = (value) => {
    this.setState({ userInputComments: value })
  }

  handlePostUserComment = (keyCode) => {
    if(keyCode === 'Enter') {
      let content = { userInput: this.state.userInputComments, 
                      userId: this.props.userReducer.id, 
                      post_id: this.props.data.post_id }

      fetch(`${ SERVER_URL_ENDPOINT }/api/postUserComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })

      axios.post('/api/getComments', { post_id: this.props.data.post_id })
      .then((response) => {
        // console.log(response.data);
        this.setState({ commentsData: response.data })
      })
      .catch((error) => console.log(`Danger! FrontEnd error ${ error }`));
      
      this.setState({ userInputComments: '' })

      
    } else {
      console.log(false);
    }
  }

  render() {

    return (
      <div>
        <button onClick={ this.handleToggleClick }>
          { this.state.showComments ? 'Hide' : 'Comments' }
          <i className="fas fa-comments"></i>
        </button>

        <UserInputComment data={ this.state } 
                          props={ this.props } 
                          postUserComment={ this.handlePostUserComment }
                          userComment={ this.handleUserInputComment }
        />

        <CommentsSection data={ this.state } 
                         props={ this.props }
                         
        />

      </div>
    );
  }
}

function mapPropToState(state) {
  return state
}

export default connect(mapPropToState, {  }) (Comments);
