import React, { Component } from 'react';
import NavBar from '../navBar/NavBar';
import { connect } from 'react-redux';
import ImageUploader from '../form/ImageUploader';



function EditUserName(props) {
  console.log(props);
  if(!props.data.editAccount) {
    return(
      <input type='text' name='username' 
             placeholder={ props.props.userReducer.username }
             onChange={ (e) => props.editUserName(e.target.value) } 
             onKeyPress={ (e) => props.postUserName(e.key) } 
             >
      </input>
    )
  } else {
    return null
  }
 
}
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editAccount: true,
      newUsername: '',
     };
  }

  handleEdit = () => {
    console.log('hit');
    this.setState({ editAccount: !this.state.editAccount })
  }

  handleSubmit = (e) => {
    e.preventdefault()
  }

  handleEditUserName = (value) => {
    this.setState({ newUsername: value })
  }

  handlePostNewUserName = () => {
    console.log('hit');
    console.log(this.state);
  }
  render() {
    console.log('props', this.props.userReducer);
    return (
      <div>
        <NavBar/>
        <p>Account Components</p>

           username: { this.props.userReducer.username } 
           <button onClick={ () => this.handleEdit() }>edit</button> 
          <EditUserName data={ this.state } 
                        props={ this.props }
                        editUserName={ this.handleEditUserName }
                        postUserName={ this.handlePostNewUserName }
                        />
          <br/>
          <br/>
          Change Profile Pictue:
          <img src={ this.props.userReducer.profile_picture } alt={ this.props.userReducer.username }></img>
          <ImageUploader/>
          <br/>
          <input type="submit" value="Submit" onClick={ () => this.handleSubmit() }></input>
 

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  }) (Account);