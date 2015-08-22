// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import SearchDispatcher from "./SearchDispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable-store"
import {create, keys as LocalKeys} from "../LocalStorageContainer"
class SearchStore extends ReduceStore {
    getInitialState() {
        return Immutable({
            "text": "",
            "lastUpdated": null,
            "items": []
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputText:
                return state.set("text", action.text);
            case keys.loadItems:
                return state.merge({
                    "lastUpdated": (new Date()).getTime(),
                    items: action.items
                });
            case LocalKeys.restore:
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
        return state.items.filter(item => {
            return item.title.indexOf(state.text) !== -1 ||
                item.url.indexOf(state.text) !== -1 ||
                item.comment.indexOf(state.text) !== -1;
        }).slice(0, 1000); // [display range]
    }
}
const instance = create(SearchStore, SearchDispatcher);
export default instance;