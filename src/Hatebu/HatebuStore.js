// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import HatebuDispatcher from "./HatebuDispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable-store"
class SearchStore extends ReduceStore {
    getInitialState() {
        return Immutable({
            "text": "",
            "items": []
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputText:
                return state.set("text", action.text);
            case keys.loadItems:
                return state.set("items", action.items);
            default:
                return state;
        }
    }

    getVisibleItems() {
        var state = this.getState();
        return state.items.filter(item => {
            return item.title.indexOf(state.text) !== -1 ||
                item.url.indexOf(state.text) !== -1 ||
                item.comment.indexOf(state.text) !== -1;
        });
    }
}
const instance = new SearchStore(SearchDispatcher);
export default instance;