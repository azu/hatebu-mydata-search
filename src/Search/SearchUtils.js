// LICENSE : MIT
"use strict";
import {parse} from "hatebu-mydata-parser"
export function getMyData(userName, date) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var dateQuery = date ? "?timestamp=" + stringFromDate(date) : "";
        xhr.open("get", "https://jsonp.afeld.me/?url=http://b.hatena.ne.jp/" + userName + "/search.data" + dateQuery);
        xhr.onload = function () {
            console.log(xhr.status);
            if (200 <= xhr.status && xhr.status < 300) {
                resolve(parse(xhr.responseText));
            } else {
                reject(new Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(new Error(xhr.statusText));
        };
        xhr.send();
    });
}
export function stringFromDate(date) {
    // YYYYMMDDHHMMSS
    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
    }

    return date.getFullYear() +
        pad2(date.getMonth() + 1) +
        pad2(date.getDate()) +
        pad2(date.getHours()) +
        pad2(date.getMinutes()) +
        pad2(date.getSeconds());
}