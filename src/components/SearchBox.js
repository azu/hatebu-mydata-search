// LICENSE : MIT
"use strict";
import React from "react"
export default class SearchBox extends React.Component {
    onChange(event) {
        var text = event.target.value;
        this.props.onChange(text);
    }

    render() {
        return <div className="SearchBox">
            <input className="pure-input-1" onChange={this.onChange.bind(this)} type="text" placeholder="例) [test]" value={this.props.value} />
        </div>
    }
}