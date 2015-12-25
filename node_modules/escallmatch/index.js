/**
 * escallmatch:
 *   ECMAScript CallExpression matcher made from function/method signature
 * 
 * https://github.com/twada/escallmatch
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';
/* jshint -W024 */

var esprima = require('esprima');
var estraverse = require('estraverse');
var espurify = require('espurify');
var syntax = estraverse.Syntax;
var hasOwn = Object.prototype.hasOwnProperty;
var forEach = require('array-foreach');
var map = require('array-map');
var filter = require('array-filter');
var reduce = require('array-reduce');
var indexOf = require('indexof');
var deepEqual = require('deep-equal');
var notCallExprMessage = 'Argument should be in the form of CallExpression';
var duplicatedArgMessage = 'Duplicate argument name: ';
var invalidFormMessage = 'Argument should be in the form of `name` or `[name]`';

function createMatcher (signatureStr, options) {
    var ast = extractExpressionFrom(esprima.parse(signatureStr));
    return new Matcher(ast, options || {});
}

function Matcher (signatureAst, options) {
    this.visitorKeys = options.visitorKeys || estraverse.VisitorKeys;
    this.signatureAst = signatureAst;
    this.signatureCalleeDepth = astDepth(signatureAst.callee, this.visitorKeys);
    this.numMaxArgs = this.signatureAst.arguments.length;
    this.numMinArgs = filter(this.signatureAst.arguments, identifiers).length;
}

Matcher.prototype.test = function (currentNode) {
    var calleeMatched = this.isCalleeMatched(currentNode);
    var numArgs;
    if (calleeMatched) {
        numArgs = currentNode.arguments.length;
        return this.numMinArgs <= numArgs && numArgs <= this.numMaxArgs;
    }
    return false;
};

Matcher.prototype.matchArgument = function (currentNode, parentNode) {
    if (isCalleeOfParent(currentNode, parentNode)) {
        return null;
    }
    if (this.test(parentNode)) {
        var indexOfCurrentArg = indexOf(parentNode.arguments, currentNode);
        var numOptional = parentNode.arguments.length - this.numMinArgs;
        var matchedSignatures = reduce(this.argumentSignatures(), function (accum, argSig) {
            if (argSig.kind === 'mandatory') {
                accum.push(argSig);
            }
            if (argSig.kind === 'optional' && 0 < numOptional) {
                numOptional -= 1;
                accum.push(argSig);
            }
            return accum;
        }, []);
        return matchedSignatures[indexOfCurrentArg];
    }
    return null;
};

Matcher.prototype.calleeAst = function () {
    return espurify(this.signatureAst.callee);
};

Matcher.prototype.argumentSignatures = function () {
    return map(this.signatureAst.arguments, toArgumentSignature);
};

Matcher.prototype.isCalleeMatched = function (node) {
    if (!isCallExpression(node)) {
        return false;
    }
    if (!this.isSameDepthAsSignatureCallee(node.callee)) {
        return false;
    }
    return deepEqual(espurify(this.signatureAst.callee), espurify(node.callee));
};

Matcher.prototype.isSameDepthAsSignatureCallee = function (ast) {
    var depth = this.signatureCalleeDepth;
    var currentDepth = 0;
    estraverse.traverse(ast, {
        keys: this.visitorKeys,
        enter: function (currentNode, parentNode) {
            var path = this.path();
            var pathDepth = path ? path.length : 0;
            if (currentDepth < pathDepth) {
                currentDepth = pathDepth;
            }
            if (depth < currentDepth) {
                this['break']();
            }
        }
    });
    return (depth === currentDepth);
};

function toArgumentSignature (argSignatureNode) {
    switch(argSignatureNode.type) {
    case syntax.Identifier:
        return {
            name: argSignatureNode.name,
            kind: 'mandatory'
        };
    case syntax.ArrayExpression:
        return {
            name: argSignatureNode.elements[0].name,
            kind: 'optional'
        };
    default:
        return null;
    }
}

function astDepth (ast, visitorKeys) {
    var maxDepth = 0;
    estraverse.traverse(ast, {
        keys: visitorKeys,
        enter: function (currentNode, parentNode) {
            var path = this.path();
            var pathDepth = path ? path.length : 0;
            if (maxDepth < pathDepth) {
                maxDepth = pathDepth;
            }
        }
    });
    return maxDepth;
}

function isCallExpression (node) {
    return node && node.type === syntax.CallExpression;
}

function isCalleeOfParent(currentNode, parentNode) {
    return parentNode && currentNode &&
        parentNode.type === syntax.CallExpression &&
        parentNode.callee === currentNode;
}

function identifiers (node) {
    return node.type === syntax.Identifier;
}

function validateApiExpression (callExpression) {
    if (callExpression.type !== syntax.CallExpression) {
        throw new Error(notCallExprMessage);
    }
    var names = {};
    forEach(callExpression.arguments, function (arg) {
        var name = validateArg(arg);
        if (hasOwn.call(names, name)) {
            throw new Error(duplicatedArgMessage + name);
        } else {
            names[name] = name;
        }
    });
}

function validateArg (arg) {
    var inner;
    switch(arg.type) {
    case syntax.Identifier:
        return arg.name;
    case syntax.ArrayExpression:
        if (arg.elements.length !== 1) {
            throw new Error(invalidFormMessage);
        }
        inner = arg.elements[0];
        if (inner.type !== syntax.Identifier) {
            throw new Error(invalidFormMessage);
        }
        return inner.name;
    default:
        throw new Error(invalidFormMessage);
    }
}

function extractExpressionFrom (tree) {
    var statement, expression;
    statement = tree.body[0];
    if (statement.type !== syntax.ExpressionStatement) {
        throw new Error(notCallExprMessage);
    }
    expression = statement.expression;
    validateApiExpression(expression);
    return expression;
}

module.exports = createMatcher;
