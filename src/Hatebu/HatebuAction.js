// LICENSE : MIT
"use strict";
import Dispatcher from "../Dispatcher";
export var keys = {
    inputUser: Symbol("inputUser")
};
export default class HatebuAction {
    static inputUser(userName) {
        Dispatcher.dispatch({
            type: keys.inputUser,
            userName
        });
    }
}