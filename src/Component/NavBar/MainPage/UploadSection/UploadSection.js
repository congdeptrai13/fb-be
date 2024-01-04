import React, { Component } from 'react';
import "./UploadSection.css";
import { Avatar, Dialog, Paper } from '@mui/material';
import live from "../../../../images/video.png";
import image from "../../../../images/image.png";
import feeling from "../../../../images/feelings.png";
import firebase from '../../../../firebase';
class UploadSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            uploadImage: null,
            description: ""
        }
    }
    handleClose = () => {

    }

    openDialog = (event) => {
        this.setState({
            open: true
        });
        this.setState({
            uploadImage: URL.createObjectURL(event.target.files[0])
        });
        this.setState({
            image: event.target.files[0]
        })
    }

    uploadToFireBase = (event) => {
        const thisContext = this;
        const uploadTask = firebase.storage().ref("images").child(this.state.image.name).put(this.state.image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {

            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    let payload = {
                        'userID': JSON.parse(localStorage.getItem('user')).userID,
                        "userName": JSON.parse(localStorage.getItem('user')).userName,
                        "description": thisContext.state.description,
                        "postImgURL": downloadURL
                    };

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    };

                    fetch("http://localhost:8080/api/postService/save", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            thisContext.setState({ open: false })
                            thisContext.props.update();
                        })
                        .catch(error => {
                            // Handle the error here
                        });
                })
            });

    }
    render() {
        return (
            <div>
                <Dialog onClose={this.handleClose} className='upload__dialogbox' open={this.state.open}>
                    <div className='upload__header'>Create Post</div>
                    <input type='text' onChange={(event) => this.state.description = event.currentTarget.value} className='upload__textbox' placeholder="what's on your mind?" />
                    <img src={this.state.uploadImage} className='upload__preview' />
                    <input type='button' value="Post" onClick={this.uploadToFireBase} className='upload__button' />
                </Dialog>
                <Paper className="upload_container">
                    <div className="upload__top">
                        <div>
                            <Avatar className="upload__img" />
                        </div>
                        <div>
                            <input className="upload__box" placeholder="What's on your mind ?" type="text" />
                        </div>
                    </div>
                    <div className="upload__bottom">
                        <div className="upload__tabs">
                            <img src={live} width="35px" />
                            <div className="upload__text">Live Video</div>

                        </div>
                        <div className="upload__tabs">
                            <label for="file-upload" className='upload__tabs'>
                                <img src={image} width="35px" />
                                <div className="upload__text">Photo/Video</div>
                            </label>
                            <input type='file' id='file-upload' onChange={this.openDialog} />
                        </div>
                        <div className="upload__tabs">
                            <img src={feeling} width="35px" />
                            <div className="upload__text">Feeling/Activity</div>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default UploadSection;
