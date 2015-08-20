// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import SearchDispatcher from "./SearchDispatcher";
import { keys } from "./SearchAction"
import Immutable from "immutable"

class SearchStore extends ReduceStore<Object> {
    getInitialState():Object {
        return Immutable.Map({
            "text": "",
            "itemsForDisplay": [],
            "items": []
        });
    }

    reduce(state:Object, action:Object):Object {
        switch (action.type) {
            case keys.inputText:
                return state.set("text", text);
            case keys.loadItems:
                return state.set("items", action.items);
            default:
                return state;
        }
    }
}
function updateDisplay(state) {
    state.set("itemsForDisplay", state.get("items").filter(item => {
        return item.title.indexOf(state.get("text")) !== -1;
    }));
}
const instance = new SearchStore(SearchDispatcher);
export default instance;