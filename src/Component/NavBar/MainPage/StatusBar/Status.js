import { Paper } from '@mui/material';
import React, { Component } from 'react';
import uploadIcon from "../../../../images/upload.png"
import firebase from '../../../../firebase';
import "./StatusBar.css";

class Status extends Component {
    constructor(props) {
        super(props);

    }
    // componentDidMount() {
    //     console.log(this.props.object);
    // }
    openDialog = (event) => {
        let image = event.target.files[0];
        if (image == undefined || image == null) {
            return;
        }
        const thisContext = this;
        const uploadTask = firebase.storage().ref("images").child(image.name).put(image);
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
                        "statusImageURL": downloadURL
                    };

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    };

                    fetch("http://localhost:8080/api/statusService/save", requestOptions)
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
                {
                    this.props.uploader == "true" ?
                        <Paper className="statusbar__status">
                            <label for="file-upload" className='upload__tabs'>
                                <img src={uploadIcon} className='upload__icon' />
                            </label>
                            <input type='file' id='file-upload' onChange={this.openDialog} />
                        </Paper> :
                        <Paper className="statusbar__status">
                            <img src={this.props.object.statusImageURL} className='status__image' />
                        </Paper>
                }

            </div>
        );
    }
}

export default Status;
