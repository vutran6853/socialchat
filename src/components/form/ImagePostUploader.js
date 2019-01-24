import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import fbConfig  from '../../firebase';
import noIMage from '../../image/No_Image_Available.jpg';
import { connect } from 'react-redux';
import { getUrlImage } from '../../duck/reducer';

class ImagePostUploader extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    imageUrl: '',

  };

  componentDidUpdate() {
    let { avatarURL } = this.state;

  }
 
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
        this.props.getUrlImage(url)
        this.setState({ avatarURL: url })
      });
  };

  render() {
    let imgSrc = this.state.avatarURL ? this.state.avatarURL : noIMage;

    return (
      <div>
        { this.state.isUploading && <p>Progress: { this.state.progress }</p>}
        
        <div className='imagePreviewBox' style={ { backgroundImage: `url('${ imgSrc }') ` } } alt='post'></div>

        <FileUploader accept="image/*"
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
 
export default connect(mapStateToProps, { getUrlImage }) (ImagePostUploader);