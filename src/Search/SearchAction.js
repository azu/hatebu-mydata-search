// LICENSE : MIT
"use strict";
import {getMyData} from "./SearchUtils"
import Dispatcher from "../Dispatcher";
export var keys = {
    reset: Symbol("reset"),
    inputText: Symbol("inputText"),
    loadItems: Symbol("loadItems")

};
export default class SearchAction {
    static reset() {
        Dispatcher.dispatch({
            type: keys.reset
        });
    }

    static inputText(text) {
        Dispatcher.dispatch({
            type: keys.inputText,
            text
        });
    }

    static loadItems(userName, fromDate) {
        getMyData(userName, fromDate).then(items => {
            Dispatcher.dispatch({
                type: keys.loadItems,
                items
            });
        }).catch(error => {
            console.error(error);
        });
    }
}