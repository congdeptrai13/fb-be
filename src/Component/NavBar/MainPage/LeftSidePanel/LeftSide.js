import React, { Component } from 'react';
import "./LeftSide.css";
import ImageLayout from '../ImageLayout';
import covid from "../../../../images/covid.png";
import groups from "../../../../images/groups.png";
import memories from "../../../../images/memories.png";
import { Link } from 'react-router-dom';


class LeftSide extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: []
    }
    getData = () => {
        let jsondata = [
            {
                "image": covid,
                "text": "Profile",
                "dir": "/profile"
            },
            {
                "image": memories,
                "text": "Memories",
                "dir": "/memories"
            }

        ];
        this.setState({ data: jsondata });
    }
    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map((item) => (
                        <Link to={item.dir}><ImageLayout image={item.image} text={item.text} /></Link>
                    ))
                }


            </div>
        );
    }
}

export default LeftSide;
