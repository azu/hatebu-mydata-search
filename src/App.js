// LICENSE : MIT
"use strict";
import React from "react"
import InputUserName from "./components/InputUserName"
import BookmarkList from "./components/BookmarkList"
import SearchBox from "./components/SearchBox"
function onSubmit({name}) {
    console.log(name);
}
function onChange(text) {
    console.log(text);
}
var bookmarks = [
    {
        title: "タイトル",
        url: "http://localhost:3000/",
        comment: "[test] メッセージ"
    },
    {
        title: "NW.jsでのバイナリリリース",
        url: "http://efcl.info/2014/09/05/node-webkit-binary-release/",
        comment: "[test] ビルドが楽になりたい"
    }
];
React.render(<div>
    <InputUserName onSubmit={onSubmit}/>
    <SearchBox onChange={onChange}/>
    <BookmarkList bookmarks={bookmarks}/>
</div>, document.body);
