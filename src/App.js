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
    SearchAction.reset();
    HatebuAction.inputUser(name);
    SearchAction.loadItems(name);
}
function onChange(text) {
    SearchAction.inputText(text);
}
function onClickReload() {
    var {userName} = HatebuStore.getState();
    SearchAction.loadItems(userName, SearchStore.getLastUpdated());
}
export default class App extends React.Component {
    static getStores() {
        return [SearchStore, HatebuStore];
    }

    static calculateState(prevState) {
        return {
            search: SearchStore.getState(),
            hatebu: HatebuStore.getState(),
            visibleItems: SearchStore.getVisibleItems()
        };
    }

    render() {
        return <div className="App">
            <div className="App-Header">
                <InputUserName userName={this.state.hatebu.userName} onSubmit={onInputUserName}/>
                <ReloadButton onClick={onClickReload}/>
            </div>
            <SearchBox value={this.state.search.text} onChange={onChange}/>
            <BookmarkList bookmarks={this.state.visibleItems}/>
        </div>
    }
}

const AppContainer = Container.create(App);
React.render(<AppContainer />, document.body);
