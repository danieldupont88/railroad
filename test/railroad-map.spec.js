'use strict';

var assert = require('chai').assert;
var Map = require('../bin/railroad-map');


describe('Railroad Map', function() {
    it('should add a city to the graph', function() {
        var map = new Map();
        map.addRouteToGraph({origin:'A', destination:'B', distance:5});
        assert.equal('A', Object.keys(map.getGraph())[0]);
    });
    it('should add a neighbor to the city', function() {
        var map = new Map();
        map.addRouteToGraph( {origin:'A', destination:'C', distance:4});
        var graph = map.getGraph();
        assert.equal(1, Object.keys(graph['A'].neighbors).length);
    });
    it('should return the distance for a given path', function() {
        var map = new Map();
        map.addRouteToGraph( {origin:'A', destination:'C', distance:4});
        assert.equal(4, map.getDistanceFromOneTrip('A', 'C'));
    });
    it('A given route will never appear more than once', function() {
        var map = new Map();
        function test () {
            map.addRouteToGraph({origin:'A', destination:'C', distance:4});
            map.addRouteToGraph({origin:'A', destination:'C', distance:4});
        };
        assert.throws(test, Error, 'ROUTE ALREADY EXISTS');
    });
    it('The starting and ending town will not be the same', function() {
        var map = new Map();
        function test () {
            map.addRouteToGraph({origin: 'A', destination: 'A', distance: 4});
        };
        assert.throws(test, Error, 'ORIGIN AND DESTINATION ARE THE SAME');
    });
});
