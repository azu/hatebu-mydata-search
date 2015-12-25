"use strict";
/**
 * create Date object from yyyymmddhhmmss string
 * @param {string} dateStr yyyymmddhhmmss
 * @returns {Date}
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dateFromString = dateFromString;
exports.parseLineByLine = parseLineByLine;

function dateFromString(dateStr) {
    // dateStr
    // yyyymmddhhmmss
    return new Date(dateStr.substring(0, 4), parseInt(dateStr.substr(4, 2), 10) - 1, dateStr.substr(6, 2), dateStr.substr(8, 2), dateStr.substr(10, 2), dateStr.substr(12, 2));
}

/**
 * create tuple that
 * @param text
 * @returns {{bookmarks: string[], lines: string[]}}
 */

function parseLineByLine(text) {
    var lines = text.trim().split("\n");
    var bookmarks = lines.splice(0, lines.length * 3 / 4);
    return {
        bookmarks: bookmarks,
        lines: lines
    };
}
//# sourceMappingURL=hatebu-mydata-utils.js.map