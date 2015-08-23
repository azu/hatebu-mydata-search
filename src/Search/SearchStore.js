// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import Dispatcher from "../Dispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable-store"
import {getStorage, setStorage} from "../LocalStorageContainer"
const restoreType = Symbol("restore");
class SearchStore extends ReduceStore {
    constructor(...args) {
        super(...args);
        getStorage(this.constructor.name).then(state => {
            Dispatcher.dispatch({
                type: restoreType,
                state
            });
        });
        this.addListener(() => {
            var storeName = this.constructor.name;
            var state = this.getState();
            setStorage(storeName, state).catch(error => {
                console.warn(error, " on " + storeName);
            });
        });
    }

    getInitialState() {
        return Immutable({
            "text": "",
            "lastUpdated": null,
            "items": []
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.reset:
                return Immutable({
                    "text": "",
                    "lastUpdated": null,
                    "items": []
                });
            case keys.inputText:
                return state.set("text", action.text);
            case keys.loadItems:
                var newState = state.items.concat(action.items);
                return newState.set("lastUpdated", (new Date()).getTime());
            case restoreType:
                return state.import(action.state);
            default:
                return state;
        }
    }

    /**
     * @returns {Date|null}
     */
    getLastUpdated() {
        var state = this.getState();
        if (!state.lastUpdated) {
            return null;
        }
        return new Date(state.lastUpdated);
    }

    getVisibleItems() {
        var state = this.getState();
        if (state.items == null) {
            return [];
        }
        return state.items.filter(item => {
            return item.title.indexOf(state.text) !== -1 ||
                    //item.url.indexOf(state.text) !== -1 ||
                item.comment.indexOf(state.text) !== -1;
        }).slice(0, 1000); // [display range]
    }
}
const instance = new SearchStore(Dispatcher);
export default instance;