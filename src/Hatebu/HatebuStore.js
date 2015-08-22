// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import HatebuDispatcher from "./HatebuDispatcher";
import { keys } from "./HatebuAction"
import Immutable from "immutable-store"
import {create, keys as LocalKeys} from "../LocalStorageContainer"
class HatebuStore extends ReduceStore {
    getInitialState() {
        return Immutable({
            "userName": ""
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputUser:
                return state.set("userName", action.userName);
            case LocalKeys.restore:
                return state.import(action.state);
            default:
                return state;
        }
    }
}
const instance = create(HatebuStore, HatebuDispatcher);
export default instance;