// LICENSE : MIT
"use strict";
import React from "react"
import InputUserName from "./components/InputUserName"
import BookmarkList from "./components/BookmarkList"
import ReloadButton from "./components/ReloadButton"
import HatebuAction from "./Hatebu/HatebuAction"
import HatebuStore from "./Hatebu/HatebuStore"
import SearchBox from "./components/SearchBox"
import SearchStore from "./Search/SearchStore"
import SearchAction from "./Search/SearchAction"
import {Container} from 'flux/utils';
function onInputUserName({name}) {
    HatebuAction.inputUser(name);
}
function onChange(text) {
    SearchAction.inputText(text);
}
function onClickReload() {
    var {userName} = HatebuStore.getState();
    SearchAction.loadItems(userName, SearchStore.getLastUpdated());
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
export default class App extends React.Component {
    static getStores() {
        return [SearchStore];
    }

    static calculateState(prevState) {
        return {
            search: SearchStore.getState(),
            hatebu: HatebuStore.getState(),
            visibleItems: SearchStore.getVisibleItems()
        };
    }

    render() {
        return <div>
            <InputUserName onSubmit={onInputUserName}/>
            <ReloadButton userName={this.state.hatebu.userName} onClick={onClickReload}/>
            <SearchBox value={this.state.search.text} onChange={onChange}/>
            <BookmarkList bookmarks={this.state.visibleItems}/>
        </div>
    }
}

const AppContainer = Container.create(App);
React.render(<AppContainer />, document.body);
