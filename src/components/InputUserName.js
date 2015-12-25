// LICENSE : MIT
"use strict";
import React from "react"
export default class InputUserName extends React.Component {
    onSubmit(event) {
        event.preventDefault();
        var name = this.refs.userName.value;
        this.props.onSubmit({
            name
        });
    }

    render() {
        return <div className="InputUserName">
            <p className="InputUserName-currentUser">現在のユーザ: {this.props.userName}</p>
            <form className="InputUserName-form pure-form" onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="userName"></input>
                <input className="pure-button" type="submit" value="変更"></input>
            </form>
        </div>
    }
}