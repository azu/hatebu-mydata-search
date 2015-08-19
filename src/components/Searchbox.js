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
            <input onChange={this.onChange.bind(this)} type="text" placeholder="例) [test]"/>
        </div>
    }
}