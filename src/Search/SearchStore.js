// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import SearchDispatcher from "./SearchDispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable-store"
import {create} from "../LocalStorageContainer"
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
        return state.items.slice(0, 100).filter(item => {
            return item.title.indexOf(state.text) !== -1 ||
                item.url.indexOf(state.text) !== -1 ||
                item.comment.indexOf(state.text) !== -1;
        });
    }
}
const instance = create(SearchStore, SearchDispatcher);
export default instance;