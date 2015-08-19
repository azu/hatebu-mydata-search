// LICENSE : MIT
"use strict";
import React from "react"
import InputUserName from "./components/InputUserName"
import BookmarkList from "./components/BookmarkList"
function onSubmit({name}) {
    console.log(name);
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
    <BookmarkList bookmarks={bookmarks}/>
</div>, document.body);
