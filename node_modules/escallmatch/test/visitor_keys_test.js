'use strict';

var escallmatch = require('..');
var estraverse = require('estraverse');
var assert = require('assert');

//// original code of jsx_test.json:
// var assert = require('power-assert');
// it('CheckboxWithLabel', function() {
//     var CheckboxWithLabel = require('../src/CheckboxWithLabel.js');
//     (<CheckboxWithLabel labelOn="On" labelOff="Off"/>).assert.equals('Off');
// });
var ast = require('./jsx_test.json');

function matchAst (ast, matcher, visitorKeys) {
    var calls = [];
    var args = [];
    var captured = {};
    estraverse.traverse(ast, {
        keys: visitorKeys,
        leave: function (currentNode, parentNode) {
            if (matcher.test(currentNode)) {
                calls.push(currentNode);
            }
            var matched = matcher.matchArgument(currentNode, parentNode);
            if (matched) {
                args.push(matched);
                captured[matched.name] = currentNode;
            }
        }
    });
    return {
        calls: calls,
        args: args,
        captured: captured
    };
}

it('custom visitorKeys', function () {
    var visitorKeys = require('./visitor-keys.json');
    var matcher = escallmatch('assert.jsx.equal(value, [message])', { visitorKeys: visitorKeys });
    var matched;
    assert.doesNotThrow(function () {
        matched = matchAst(ast, matcher, visitorKeys);
    });
    assert.equal(matched.calls.length, 0);
});
