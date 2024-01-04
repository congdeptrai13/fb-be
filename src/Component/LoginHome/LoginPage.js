import React, { Component } from 'react';
import './LoginPage.css'
import { Grid, Paper } from '@mui/material';
import firebase from '../../firebase';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIN: true,

            signin_email: null,
            signin_password: null,
            //signup
            signup_name: null,
            signup_email: null,
            signup_password: null
        }
    }

    switchPanel = () => {
        if (this.state.signIN)
            this.setState({ signIN: false });
        else
            this.setState({ signIN: true });
    }

    signUP = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.signup_email, this.state.signup_password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...

                let payload = {
                    'userID': user.uid,
                    "userName": this.state.signup_name,
                    "userImage": "https://gravatar.com/avatar/809b8ba77ee56d2a2967993c7c5da6a1?s=400&d=robohash&r=x",
                };

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                };

                fetch("http://localhost:8080/api/userService/save", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response data here
                        const user = userCredential.user;
                        // ...
                        localStorage.setItem('user', JSON.stringify(data));
                        window.location.reload(true);
                    })
                    .catch(error => {
                        // Handle the error here
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    signInMethod = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.signin_email, this.state.signin_password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                fetch("http://localhost:8080/api/userService/getAllUsers/" + user.uid)
                    .then(response => response.json())
                    .then(data => {
                        console.log("hello world");
                        // Handle the response data here
                        // ...
                        localStorage.setItem('user', JSON.stringify(data));
                        window.location.reload(true);
                    })
                    .catch(error => {
                        // Handle the error here
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }


    render() {
        return (
            <div>
                <Grid item xs={7}>
                    <div className="fblogo">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="" width={300} />
                    </div>
                    <div>
                        <h1 className='text'>Facebook helps you connect and share with the people in your life</h1>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Paper className='loginCard__container'>
                        {
                            this.state.signIN == true
                                ?
                                <div className='login__panel'>
                                    <div>
                                        <input onChange={(event) => {
                                            this.state.signin_email = event.currentTarget.value
                                        }} type="text" className="login__input" placeholder='Email address' />
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            this.state.signin_password = event.currentTarget.value
                                        }} type="password" className="login__input" placeholder='Password' />
                                    </div>
                                    <div>
                                        <button onClick={this.signInMethod} className='login_button'>Log in</button>
                                    </div>
                                    <div className='forget_text'>
                                        Forgotten password ?
                                    </div>
                                    <div>
                                        <div className='dividor'></div>
                                    </div>
                                    <div>
                                        <button className='login_createnew' onClick={this.switchPanel}>Create New Account</button>
                                    </div>
                                </div>
                                :
                                <div container="login_panel">

                                    <div>
                                        <input onChange={(event) => {
                                            this.state.signup_name = event.currentTarget.value
                                        }} type="text" className="login_input" placeholder="Name" />
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            this.state.signup_email = event.currentTarget.value
                                        }} type="text" className="login_input" placeholder="Email address" />
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            this.state.signup_password = event.currentTarget.value
                                        }} type="password" className="login_input" placeholder="Password" />
                                    </div>

                                    <div>
                                        <button onClick={this.signUP} className="login_button">Sign Up</button>
                                    </div>

                                    <div>

                                        <div onClick={this.switchPanel} className="forget_Text">Already have account?</div>

                                    </div>

                                </div>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </div >
        );
    }
}

export default LoginPage;