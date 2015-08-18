// LICENSE : MIT
"use strict";
import React from "react"
import InputUserName from "./components/InputUserName"
function onSubmit({name}) {
    console.log(name);
}
React.render(<InputUserName onSubmit={onSubmit}/>, document.body);