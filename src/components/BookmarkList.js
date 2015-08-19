// LICENSE : MIT
"use strict";
import React from "react"
export class BookmarkListItem extends React.Component {
    render() {
        var {title, url, comment} = this.props.bookmark;
        return <li className="BookmarkListItem">
            <a href={url}>{title}</a>

            <p>{comment}</p>
        </li>
    }
}
export default class BookmarkList extends React.Component {
    render() {
        var items = this.props.bookmarks.map(bookmark => {
            return <BookmarkListItem key={bookmark.url} bookmark={bookmark}/>;
        });
        return <ul className="BookmarkList">
            {items}
        </ul>
    }
}