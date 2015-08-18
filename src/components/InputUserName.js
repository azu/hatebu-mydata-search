// LICENSE : MIT
"use strict";
import React from "react"
export default class InputUserName extends React.Component {
    onSubmit(event) {
        event.preventDefault();
        var name = React.findDOMNode(this.refs.userName).value;
        this.props.onSubmit({
            name
        });
    }

    render() {
        return <div className="InputUserName">
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="userName"></input>
                <input type="submit" value="決定"></input>
            </form>
        </div>
    }
}