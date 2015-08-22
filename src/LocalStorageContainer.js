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
