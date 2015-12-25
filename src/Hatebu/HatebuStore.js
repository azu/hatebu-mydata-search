// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import Dispatcher from "../Dispatcher";
import { keys } from "./HatebuAction"
import Immutable from "immutable-store"
import {getStorage, setStorage} from "../LocalStorageContainer"
const restoreType = Symbol("restore");
class HatebuStore extends ReduceStore {
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
            "userName": "tester"
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputUser:
                return state.set("userName", action.userName);
            case restoreType:
                return state.import(action.state);
            default:
                return state;
        }
    }
}
const instance = new HatebuStore(Dispatcher);
export default instance;