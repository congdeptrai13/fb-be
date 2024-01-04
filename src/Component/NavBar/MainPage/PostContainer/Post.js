import React, { Component } from 'react';
import "./PostContainer.css";
import { Avatar, Paper } from '@mui/material';
import post from "../../../../images/post.jpeg";
import like from "../../../../images/like.png";
import likebutton from "../../../../images/likebutton.png";
import commentbutton from "../../../../images/comment.png";
import sharebutton from "../../../../images/share.png";
import { Button } from 'react-bootstrap';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            listComment: []
        }
    }

    getComments = () => { //API backend

        fetch(`http://localhost:8080/api/commentService/getAllComments/${this.props.object.postID}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ listComment: res });
                console.log(this.state.listComment)
            })
            .catch(error => {
                // Handle the error here
            });

    }
    componentDidMount() {
        this.getComments();
    }
    isImageAvailable = (data) => {
        return data == "" ? false : true;
    }
    // componentDidMount() {
    //     console.log(this.props)
    // }



    handleSubmitComment = () => {
        let payload = {
            'postID': this.props.object.postID,
            'userID': JSON.parse(localStorage.getItem('user')).userID,
            'userImage': JSON.parse(localStorage.getItem('user')).userImage,
            'userName': JSON.parse(localStorage.getItem('user')).userName,
            "comment": this.state.comment
        };

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };

        fetch("http://localhost:8080/api/commentService/save", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.getComments();
                this.setState({comment: ""});
            })
            .catch(error => {
                // Handle the error here
            });
    }

    handleLike = () => {

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        };

        fetch(`http://localhost:8080/api/postService/${this.props.object.postID}/like`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // this.getComments();
                // console.log("hello");
            })
            .catch(error => {
                // Handle the error here
            });
    }

    render() {
        return (
            <div>
                <Paper className="post__container">
                    <div className="post__header">
                        <div className="post__header__img">
                            <Avatar className="post__img" />
                        </div>
                        <div className="post__header__text">
                            {this.props.object.userName}
                        </div>

                    </div>
                    {/**decription */}
                    <div className="post__decription">
                        {this.props.object.description}

                    </div>
                    {/**image */}

                    <div className="post__image">
                        {
                            this.isImageAvailable() ? <img src={this.props.object.postImgURL} width="600px" /> : <span></span>
                        }


                    </div>
                    {/**Like count */}
                    <div className="post__likecountContainer">
                        <div className="post__like">
                            <img className="post__imgl" src={like} />
                        </div>
                        <div className="post__likecount">
                            {this.props.object.likes}
                        </div>

                    </div>
                    {/**Like share box */}
                    <div className="post__likeShare">
                        <div className="post__tabs" onClick={this.handleLike}>

                            <div className="post__tabfirst">
                                <img className="post__tabimg" src={likebutton} />
                            </div>
                            <div className="post__tabtext">
                                Like
                            </div>
                        </div>
                        <div className="post__tabs">
                            <div className="post__tabfirst">
                                <img className="post__tabimg" src={commentbutton} />
                            </div>
                            <div className="post__tabtext">
                                comment
                            </div>
                        </div>
                        <div className="post__tabs">
                            <div className="post__tabfirst">
                                <img className="post__tabimg" src={sharebutton} />
                            </div>
                            <div className="post__tabtext">
                                Share
                            </div>
                        </div>

                    </div>
                    {/**comment */}
                    <div className="upload__comment">
                        {
                            this.state.listComment.map((item, index) => (
                                index < 4 ?
                                    <div className="upload__top">
                                        <div className='box__info'>
                                            <p>{item.userName}</p>
                                            <Avatar className="upload__img" />
                                        </div>
                                        <div className='upload__comment__box'>
                                            <p className="upload__box comment__posted">
                                                {item.comment}
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                // <div className="post_comment">{item.userName}: {item.comment}</div> : <span></span>
                            ))
                        }
                        <div className="upload__top">
                            <div>
                                <Avatar className="upload__img" />
                            </div>
                            <div className='upload__comment__box'>
                                <input onChange={(e) => this.state.comment = e.target.value} className="upload__box" placeholder="What's on your mind ?" type="text" />
                                <button onClick={this.handleSubmitComment} className='btn btn-primary'>post</button>
                            </div>
                        </div>

                    </div>

                </Paper>
            </div>
        );
    }
}

export default Post;
