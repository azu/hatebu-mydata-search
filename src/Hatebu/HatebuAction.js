// LICENSE : MIT
"use strict";
import HatebuDispatcher from "./HatebuDispatcher";
export var keys = {
    inputUser: Symbol("inputUser")
};
export default class HatebuAction {
    static inputUser(userName) {
        HatebuDispatcher.dispatch({
            type: keys.inputUser,
            userName
        });
    }
}