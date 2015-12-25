"use strict";
var {dateFromString, parseLineByLine} = require("./hatebu-mydata-utils");
var _myDataFormat = {
    title: "string",
    comment: "string",
    url: "string",
    date: new Date()
};
/**
 * search.dataについては`/doc/search.data-format.md`を参照
 *
 * @param {string} text
 * @returns {[_myDataFormat]}
 */
export function parse(text) {
    if (text == null) {
        return [];
    }
    var myDataTuple = parseLineByLine(text);
    if (myDataTuple.bookmarks.length === 0 || myDataTuple.lines.length === 0) {
        return [];
    }
    return myDataTuple.lines.map(function (metaInfo, index) {
        var bIndex = index * 3;
        var timestamp = metaInfo.split("\t", 2)[1];
        var title = myDataTuple.bookmarks[bIndex];
        var comment = myDataTuple.bookmarks[bIndex + 1];
        var url = myDataTuple.bookmarks[bIndex + 2];
        return {
            title: title,
            comment: comment,
            url: url,
            date: dateFromString(timestamp)
        }
    });
}