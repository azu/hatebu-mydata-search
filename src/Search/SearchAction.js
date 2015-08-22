// LICENSE : MIT
"use strict";
import {getMyData} from "./SearchUtils"
import SearchDispatcher from "./SearchDispatcher";
export var keys = {
    inputText: Symbol("inputText"),
    loadItems: Symbol("loadItems")

};
export default class SearchAction {
    static inputText(text) {
        SearchDispatcher.dispatch({
            type: keys.inputText,
            text
        });
    }

    static loadItems(userName, fromDate) {
        getMyData(userName, fromDate).then(items => {
            SearchDispatcher.dispatch({
                type: keys.loadItems,
                items
            });
        }).catch(error => {
            console.error(error);
        });
    }
}