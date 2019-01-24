import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import fbConfig  from '../../firebase';
import noIMage from '../../image/No_Image_Available.jpg';
import { connect } from 'react-redux';
import { getUrlImage, postUserProfileUrlImage, getUserInfo } from '../../duck/reducer';

class ImageAccountUploader extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    imageUrl: '',

  };

  handleChangeUsername = (event) => 
    this.setState({ username: event.target.value });
    
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });

    
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
  };

  handleUploadSuccess = (filename, url) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.postUserProfileUrlImage(this.props.userReducer.id, url)
        .then((response) => {
          this.props.getUserInfo(response.value.data[0].user_id, response.value.data[0].user_username, response.value.data[0].user_profile_pic)
        })
        .catch((error) => console.log(`Danger Error getUserInfo ${ error }`))
      })
      .catch((error) => console.log(`Danger Error postUserProfileUrlImage ${ error }`))
  };

  render() {
    let imgSrc = this.state.avatarURL ? this.state.avatarURL : noIMage;
    return (
      <div>
        { this.state.isUploading && <p>Progress: { this.state.progress }</p>}

        <FileUploader accept="userProfilePirture/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={ firebase.storage().ref("images") }
                      onUploadStart={ this.handleUploadStart }
                      onUploadError={ this.handleUploadError }
                      onUploadSuccess={ this.handleUploadSuccess }
                      onProgress={ this.handleProgress }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}
 
export default connect(mapStateToProps, { getUrlImage, postUserProfileUrlImage, getUserInfo })(ImageAccountUploader);