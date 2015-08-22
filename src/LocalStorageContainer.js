// LICENSE : MIT
"use strict";
import Immutable from "immutable-store"
import localforage from "localforage"
localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]);
export var keys = {
    restore: Symbol("restore")
};
export function setStorage(storeName, state) {
    return new Promise((resolve, reject) => {
        var serialized = JSON.stringify(state);
        resolve(serialized);
    }).then(serialized => {
            return localforage.setItem(storeName, serialized);
        });
}
export function getStorage(storeName) {
    return localforage.getItem(storeName).then(state => {
        if (state == null) {
            return {}
        }
        return JSON.parse(state)
    });
}
/**
 *
 * @param {FluxReduceStore} store
 * @returns {FluxMapStore} store
 */
export function mixin(store) {
    store.addListener(function () {
        var storeName = store.constructor.name;
        var state = store.getState();
        setStorage(storeName, state).catch(error => {
            console.warn(error, " on " + storeName);
        });
    });
    return store;
}
/**
 * @param {FluxReduceStore} Store
 * @param {Dispatcher} Dispatcher
 */
export function create(Store, Dispatcher) {
    var store = mixin(new Store(Dispatcher));
    getStorage(Store.name).then(storedState => {
        Dispatcher.dispatch({
            type: keys.restore,
            state: storedState
        });
    }).catch(console.log.bind(console));
    return store;
}