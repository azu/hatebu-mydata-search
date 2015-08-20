// LICENSE : MIT
"use strict";
import {parse} from "hatebu-mydata-parser"
export function getMyData(userName){
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "test/fixtures/search.data");
        xhr.onload = function(){
            resolve(parse(xhr.responseText));
        };
        xhr.onerror = function () {
            reject(new Error(xhr.statusText));
        };
        xhr.send();

    });
}