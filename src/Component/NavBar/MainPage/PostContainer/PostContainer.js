import React, { Component } from 'react';
import "./PostContainer.css";
import Post from './Post';
import post_img from "../../../../images/post.jpeg";


class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    getData = () => {//calling the rest from our backend
        fetch("http://localhost:8080/api/postService/getPost")
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res });
                // console.log(this.state.data)
            })
            .catch(error => {
                // Handle the error here
            });

    }
    componentDidMount() {
        this.getData();
    }


    render() {
        return (
            <div>
                {
                    this.state.data.map((item) => (
                        <Post object={item} />

                    ))
                }


            </div>
        );
    }
}

export default PostContainer;
