// LICENSE : MIT
"use strict";
import {ReduceStore} from 'flux/utils';
import HatebuDispatcher from "./HatebuDispatcher";
import { keys } from "./HatebuAction"
import Immutable from "immutable-store"
import {create} from "../LocalStorageContainer"
class HatebuStore extends ReduceStore {
    getInitialState() {
        return Immutable({
            "user": ""
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case keys.inputUser:
                return state.set("user", action.userName);
            default:
                return state;
        }
    }
}
const instance = create(HatebuStore, HatebuDispatcher);
export default instance;