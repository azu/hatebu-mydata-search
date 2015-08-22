// LICENSE : MIT
"use strict";
import React from "react"
export default class ReloadButton extends React.Component {
    render() {
        return <div className="ReloadButton">
            <button onClick={this.props.onClick}>Reload</button>
        </div>
    }
}