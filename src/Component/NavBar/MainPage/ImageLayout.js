import { Avatar } from '@mui/material';
import React, { Component } from 'react';
import "./MainPage.css";

class ImageLayout extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div className="imageLayout__container">
               <div className="imageLayout__imgLay">
                <Avatar className="imageLayout__img" src={this.props.image}/>

               </div>
               <div className="imageLayout__text">
                   {this.props.text}
               </div>
            </div>
         );
    }
}
 
export default ImageLayout;
