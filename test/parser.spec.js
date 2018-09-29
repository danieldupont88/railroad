'use strict';

var assert = require('chai').assert;
var Parser = require('../bin/parser.js');
var parser = new Parser();

describe('Parser', function () {
    it('should create a route', function () {
        var route = parser.generateRoute('AB5');
        assert.equal(route.origin, 'A');
        assert.equal(route.destination, 'B');
        assert.equal(route.distance, 5);
    });
    it('should only accept routes with [A-Z]{2}/d+ format', function () {
        function test () {
            parser.generateRoute('ABC5z');
        }
        assert.throws(test, Error, 'INVALID ROUTE FORMAT');
    });
    it('should parse the input string', function () {
        var params = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
        assert.equal(9, parser.parseInput(params).length);
    });
});
