'use strict';

var forEach = require('..');
var assert = require('assert');

describe('forEach', function () {

    describe('iterates Array', function () {
        var ary = ['foo', 'bar', 'baz'];

        it('with each item', function () {
            var result = '';
            forEach(ary, function (str) {
                result += str;
            });
            assert(result === 'foobarbaz');
        });
        it('with indices', function () {
            var indices = [];
            forEach(ary, function (str, idx) {
                indices.push(idx);
            });
            assert.deepEqual(indices, [0, 1, 2]);
        });
        it('with Array itself', function () {
            var collector = [];
            forEach(ary, function (str, idx, itself) {
                collector.push(itself);
            });
            assert.deepEqual(collector, [
                ['foo', 'bar', 'baz'],
                ['foo', 'bar', 'baz'],
                ['foo', 'bar', 'baz']
            ]);
        });
    });

    describe('exceptional cases', function () {
        it('throws TypeError when ary is null', function () {
            assert.throws(function () {
                forEach(null, function () {});
            }, TypeError);
        });
        it('throws TypeError when ary is undefined', function () {
            assert.throws(function () {
                forEach(undefined, function () {});
            }, TypeError);
        });
        it('throws TypeError when callback is not a function', function () {
            assert.throws(function () {
                forEach(['foo', 'bar'], 4);
            }, TypeError);
        });
    });
});
