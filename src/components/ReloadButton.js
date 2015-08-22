// LICENSE : MIT
"use strict";
import React from "react"
export default class ReloadButton extends React.Component {
    render() {
        return <div className="ReloadButton">
            <p>Current: {this.props.userName}</p>
            <button onClick={this.props.onClick}>Reload</button>
        </div>
    }
}