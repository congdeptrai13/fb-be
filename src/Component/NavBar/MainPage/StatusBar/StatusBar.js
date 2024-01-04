import React, { Component } from 'react';
import Status from './Status';
import "./StatusBar.css";


class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    getData = () => {
        fetch("http://localhost:8080/api/statusService/getAllStatus")
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res });
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
            <div className="statusbar__container">
                <Status uploader="true" />
                {
                    this.state.data.map(item =>
                        <Status object={item} />
                    )
                }
            </div>
        );
    }
}

export default StatusBar;
